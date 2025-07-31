package mk.ukim.finki.fithubapi.UserService.mapper;

import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.models.User;

import java.util.List;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.encodeToBase64;


public class UserMapper {

    public static UserDto toDto(User user, Boolean lowResolution) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setNumFollowers(user.getFollowers() != null ? user.getFollowers().size() : 0);
        dto.setNumFollowing(user.getFollowing() != null ? user.getFollowing().size() : 0);
        dto.setNumPosts(user.getPosts().size());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setAvatar(user.getAvatar() != null ? encodeToBase64(user.getAvatar()) : null);
        dto.setBio(user.getBio());
        dto.setDailyCalories(user.getDailyCalories());
        dto.setOauth2Id(user.getOauth2Id());
        dto.setProfessionalTrainerId(user.getProfessionalTrainerId());
        dto.setHeight(user.getHeight());
        dto.setWeight(user.getWeight());
        dto.setBirthDate(user.getBirthDate());
        dto.setGoal(user.getGoal());
        dto.setActivityLevel(user.getActivityLevel());
        dto.setGender(user.getGender());
        dto.setUnit(user.getUnit());
        return dto;
    }

    public static User toEntity(UpsertUserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setAvatar(dto.getAvatar() != null ? decodeFromBase64(dto.getAvatar()) : null);
        user.setBio(dto.getBio());
        user.setHeight(dto.getHeight());
        user.setWeight(dto.getWeight());
        user.setBirthDate(dto.getBirthDate());
        user.setUnit(dto.getUnits());
        user.setGender(dto.getGender());
        user.setGoal(dto.getGoal());
        user.setActivityLevel(dto.getActivityLevel());
        return user;
    }

    public static List<UserDto> toDtoList(List<User> users, Boolean lowResolution) {
        return users.stream().map(user -> toDto(user, lowResolution)).toList();
    }
}
