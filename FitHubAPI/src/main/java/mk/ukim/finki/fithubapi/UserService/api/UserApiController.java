package mk.ukim.finki.fithubapi.UserService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody @Valid UpsertUserDto userDto) {
        return ResponseEntity.ok(userService.edit(id, userDto));
    }

    @DeleteMapping("/disable/{id}")
    public ResponseEntity<Long> disableUser(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(userService.disable(id));
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken() {
        return ResponseEntity.ok(true);
    }

    @GetMapping("/get_logged_user")
    public ResponseEntity<UserDto> getLoggedInUser() {
        return ResponseEntity.ok(userService.getLoggedInUser());
    }

    @GetMapping("/getFollowersForUser/{userId}")
        public ResponseEntity<List<UserDto>> getFollowersForUser(@PathVariable @NotNull Long userId){
        return ResponseEntity.ok(userService.getFollowersForUser(userId));
    }

    @GetMapping("/getFollowingForUser/{userId}")
        public ResponseEntity<List<UserDto>> getFollowingForUser(@PathVariable @NotNull Long userId){
        return ResponseEntity.ok(userService.getFollowingForUser(userId));
    }

}
