package mk.ukim.finki.userservice.service.implementation;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.userservice.dto.UserDto;
import mk.ukim.finki.userservice.enums.RoleName;
import mk.ukim.finki.userservice.exceptions.RoleNotFoundException;
import mk.ukim.finki.userservice.exceptions.UserNotFoundException;
import mk.ukim.finki.userservice.mapper.UserMapper;
import mk.ukim.finki.userservice.models.User;
import mk.ukim.finki.userservice.dto.UpsertUserDto;
import mk.ukim.finki.userservice.repository.RoleRepository;
import mk.ukim.finki.userservice.repository.UserRepository;
import mk.ukim.finki.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    public UserDto register(@NotNull UpsertUserDto userDto) {
        User user = UserMapper.toEntity(userDto);
        user.onCreate();
        user.addRole(roleRepository
                .findByName(RoleName.USER)
                .orElseThrow(() -> new RoleNotFoundException("Role not found with name USER")));
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        User savedUser = userRepository.save(user);
        return UserMapper.toDto(savedUser);
    }

    @Override
    public User findByUsername(@NotNull String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
    }

    @Override
    public UserDto findById(@NotNull Long id) {
        return UserMapper.toDto(userRepository
                .findById(id)
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
    public UserDto edit(@NotNull Long id, @NotNull  UpsertUserDto userDto) {
        if(userRepository.findById(id).isPresent()){
            User user = UserMapper.toEntity(userDto);
            user.onUpdate();
            User savedUser = userRepository.save(user);
            return UserMapper.toDto(savedUser);
        }
        else {
            throw new UserNotFoundException("User not found with id: " + id);
        }
    }
}
