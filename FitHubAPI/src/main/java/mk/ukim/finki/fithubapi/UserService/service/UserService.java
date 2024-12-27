package mk.ukim.finki.fithubapi.UserService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.models.User;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;

import java.util.List;

public interface UserService {
    UserDto register(@NotNull UpsertUserDto userDto);

    User findByUsername(@NotNull String username);

    UserDto findById(@NotNull Long id);

    Long disable(@NotNull Long id);

    UserDto edit(@NotNull Long id, @NotNull UpsertUserDto userDto);

    UserDto getLoggedInUser();

    Integer getDailyCaloriesForLoggedUser(User user);

    List<UserDto> getFollowersForUser(Long userId);

    List<UserDto> getFollowingForUser(Long userId);
}
