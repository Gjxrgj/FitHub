package mk.ukim.finki.userservice.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.userservice.dto.UpsertUserDto;
import mk.ukim.finki.userservice.dto.UserDto;
import mk.ukim.finki.userservice.models.User;

public interface UserService {
    UserDto register(@NotNull UpsertUserDto userDto);

    User findByUsername(@NotNull String username);

    UserDto findById(@NotNull Long id);

    Long disable(@NotNull Long id);

    UserDto edit(@NotNull Long id, @NotNull UpsertUserDto userDto);


}
