package mk.ukim.finki.userservice.api;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.userservice.dto.UpsertUserDto;
import mk.ukim.finki.userservice.dto.UserDto;
import mk.ukim.finki.userservice.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    private final UserService userService;

    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UpsertUserDto userDto) {
        return ResponseEntity.ok(userService.edit(id, userDto));
    }

    @DeleteMapping("/disable/{id}")
    public ResponseEntity<Long> disableUser(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(userService.disable(id));
    }
}
