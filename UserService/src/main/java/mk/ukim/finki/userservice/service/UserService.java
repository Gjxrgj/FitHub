package mk.ukim.finki.userservice.service;

import mk.ukim.finki.userservice.dto.UpsertUserDto;
import mk.ukim.finki.userservice.dto.UserDto;
import mk.ukim.finki.userservice.models.User;
import org.springframework.stereotype.Service;

public interface UserService {
    UserDto register(UpsertUserDto userDto);
    User findByUsername(String username);
    UserDto findById(Long id);
    Long disable(Long id);
    UserDto edit(Long id, UpsertUserDto userDto);


}
