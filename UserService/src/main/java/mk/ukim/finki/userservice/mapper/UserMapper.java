package mk.ukim.finki.userservice.mapper;

import mk.ukim.finki.userservice.dto.UpsertUserDto;
import mk.ukim.finki.userservice.dto.UserDto;
import mk.ukim.finki.userservice.models.User;

public class UserMapper {

    public static UpsertUserDto toUpsertDTO(User user) {
        UpsertUserDto dto = new UpsertUserDto();
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword()); // Handle password securely
        dto.setAvatar(user.getAvatar());
        dto.setBio(user.getBio());
        return dto;
    }

    public static UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setAvatar(user.getAvatar());
        dto.setBio(user.getBio());
        dto.setOauth2Id(user.getOauth2Id());
        return dto;
    }

    public static User toEntity(UpsertUserDto dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setAvatar(dto.getAvatar());
        user.setBio(dto.getBio());
        return user;
    }
}
