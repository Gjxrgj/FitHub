package mk.ukim.finki.fithubapi.UserService.service.implementation;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.UpdatePersonalInfoDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.enums.ActivityLevel;
import mk.ukim.finki.fithubapi.UserService.enums.Gender;
import mk.ukim.finki.fithubapi.UserService.enums.Goal;
import mk.ukim.finki.fithubapi.UserService.enums.RoleName;
import mk.ukim.finki.fithubapi.UserService.exceptions.RoleNotFoundException;
import mk.ukim.finki.fithubapi.UserService.exceptions.UserNotFoundException;
import mk.ukim.finki.fithubapi.UserService.mapper.UserMapper;
import mk.ukim.finki.fithubapi.UserService.models.User;
import mk.ukim.finki.fithubapi.UserService.repository.RoleRepository;
import mk.ukim.finki.fithubapi.UserService.repository.UserRepository;
import mk.ukim.finki.fithubapi.UserService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepo, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepo;
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional
    public UserDto register(@NotNull UpsertUserDto userDto) {
        if (emailAlreadyExists(userDto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        } else if (usernameAlreadyExists(userDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        User user = UserMapper.toEntity(userDto);

        user.onCreate();
        user.addRole(roleRepository
                .findByName(RoleName.USER)
                .orElseThrow(() -> new RoleNotFoundException("Role not found with name USER")));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setDailyCalories(getDailyCaloriesForLoggedUser(user));
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    @Override
    public User findByUsername(@NotNull String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    @Override
    @Transactional
    public UserDto findById(@NotNull Long id) {
        return UserMapper.toDto(userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id)));
    }

    @Override
    public Long disable(@NotNull Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.setActive(false);
        userRepository.save(user);
        return id;
    }

    @Override
    @Transactional
    public UserDto edit(@NotNull Long id, @NotNull UpsertUserDto userDto) {
        Optional<User> userToUpdate = userRepository.findById(id);
        if (userToUpdate.isPresent()) {
            User user = UserMapper.toEntity(userDto);
            user.setId(userToUpdate.get().getId());
            user.setDailyCalories(getDailyCaloriesForLoggedUser(user));
            user.onUpdate();
            User savedUser = userRepository.save(user);
            return UserMapper.toDto(savedUser);
        } else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }


    public UserDto getLoggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = findByUsername(username);

        if (user == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }

        return UserMapper.toDto(user);
    }

    @Override
    public Integer getDailyCaloriesForLoggedUser(User user) {
        Gender gender = user.getGender();
        ActivityLevel activityLevel = user.getActivityLevel();
        Goal goal = user.getGoal();
        Double weight = user.getWeight();
        Double height = user.getHeight();
        LocalDate currentDate = LocalDate.now();
        LocalDate birthDate = user.getBirthDate();

        Period period = Period.between(birthDate, currentDate);
        int age = period.getYears();
        double bmr;
        if (gender == Gender.MALE) {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        double activityFactor = switch (activityLevel) {
            case SEDENTARY -> 1.2;
            case LIGHT -> 1.375;
            case MODERATE -> 1.55;
            case ACTIVE -> 1.725;
            case VERY_ACTIVE -> 1.9;
            default -> throw new IllegalArgumentException("Unknown activity level: " + activityLevel);
        };

        double dailyCalories = bmr * activityFactor;

        switch (goal) {
            case GRADUAL_WEIGHT_LOSS:
                dailyCalories -= 250;
                break;
            case MODERATE_WEIGHT_LOSS:
                dailyCalories -= 500;
                break;
            case EXTREME_WEIGHT_LOSS:
                dailyCalories -= 1000;
                break;
            case MUSCLE_GAIN:
                dailyCalories += 250;
                break;
            case MAINTAIN:
                break;
            default:
                throw new IllegalArgumentException("Unknown goal: " + goal);
        }

        return (int) dailyCalories;
    }

    @Override
    public List<UserDto> getFollowersForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        List<User> users = userRepository.findAllByIdIn(user.getFollowers());

        return UserMapper.toDtoList(users);
    }

    @Override
    public List<UserDto> getFollowingForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        List<User> users = userRepository.findAllByIdIn(user.getFollowing());

        return UserMapper.toDtoList(users);
    }

    @Override
    public UserDto updateAvatar(Long userId, String avatarData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.setAvatar(decodeFromBase64(avatarData));
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    @Override
    public UserDto updateBio(Long userId, String bio) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.setBio(bio);

        return UserMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDto updatePersonalInfo(Long userId, UpdatePersonalInfoDto upsertUserDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.setFirstName(upsertUserDto.getFirstName());
        user.setLastName(upsertUserDto.getLastName());
        user.setHeight(upsertUserDto.getHeight());
        user.setWeight(upsertUserDto.getWeight());
        user.setBirthDate(upsertUserDto.getBirthDate());
        user.setGoal(upsertUserDto.getGoal());
        user.setActivityLevel(upsertUserDto.getActivityLevel());
        user.setDailyCalories(getDailyCaloriesForLoggedUser(user));

        return UserMapper.toDto(userRepository.save(user));
    }

    @Override
    public List<UserDto> findUsersByUsername(String username) {
        return UserMapper.toDtoList(userRepository.findAllByUsernameContainingIgnoreCase(username));
    }

    @Override
    @Transactional
    public UserDto followUser(Long userId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User loggedInUser = findByUsername(username);

        if (loggedInUser == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }

        loggedInUser.addFollowing(userId);

        User followedUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        followedUser.addFollower(loggedInUser.getId());

        userRepository.save(loggedInUser);
        return UserMapper.toDto(userRepository.save(followedUser));
    }

    @Override
    public UserDto unfollowUser(Long userId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User loggedInUser = findByUsername(username);

        if (loggedInUser == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }

        loggedInUser.removeFollowing(userId);

        User followedUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        followedUser.removeFollower(loggedInUser.getId());

        userRepository.save(loggedInUser);
        return UserMapper.toDto(userRepository.save(followedUser));
    }

    @Override
    public UserDto addProfessionalTrainerToUser(Long userId, Long professionalTrainerId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
        user.setProfessionalTrainerId(professionalTrainerId);

        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    @Override
    public Boolean usernameAlreadyExists(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent();
    }

    @Override
    public Boolean emailAlreadyExists(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.isPresent();
    }
}
