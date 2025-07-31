package mk.ukim.finki.fithubapi.UserService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.LiteUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpdatePersonalInfoDto;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public ResponseEntity<List<UserDto>> getFollowersForUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(userService.getFollowersForUser(userId));
    }

    @GetMapping("/getFollowingForUser/{userId}")
    public ResponseEntity<List<UserDto>> getFollowingForUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(userService.getFollowingForUser(userId));
    }

    @PutMapping("/updateAvatar/{userId}")
    public ResponseEntity<UserDto> updateAvatar(@PathVariable @NotNull Long userId,
                                                @RequestBody @NotNull String avatarData) {
        return ResponseEntity.ok(userService.updateAvatar(userId, avatarData));
    }

    @PutMapping("/updateBio/{userId}")
    public ResponseEntity<UserDto> updateBio(@PathVariable @NotNull Long userId,
                                             @RequestBody @NotNull String bio) {
        return ResponseEntity.ok(userService.updateBio(userId, bio));
    }

    @PutMapping("/updatePersonalInfo/{userId}")
    public ResponseEntity<UserDto> updateBio(@PathVariable @NotNull Long userId,
                                             @RequestBody @NotNull UpdatePersonalInfoDto upsertUserDto) {
        return ResponseEntity.ok(userService.updatePersonalInfo(userId, upsertUserDto));
    }

    @GetMapping("/findFriends")
    public ResponseEntity<List<UserDto>> findFriends(
            @RequestParam String username) {
        return ResponseEntity.ok(userService.findUsersByUsername(username));
    }

    @PutMapping("/follow/{userId}")
    public ResponseEntity<UserDto> followUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(userService.followUser(userId));
    }

    @PutMapping("/unfollow/{userId}")
    public ResponseEntity<UserDto> unfollowUser(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(userService.unfollowUser(userId));
    }

    @PutMapping("/professionalTrainer/{userId}")
    public ResponseEntity<UserDto> addProfessionalTrainerToUser(
            @PathVariable @NotNull Long userId,
            @RequestBody @NotNull Map<String, Long> requestBody
    ) {
        return ResponseEntity.ok(userService.addProfessionalTrainerToUser(userId, requestBody.get("professionalTrainerId")));
    }

    @PostMapping("/lite_users")
    public ResponseEntity<List<LiteUserDto>> getUsersForLikeModal(@RequestBody List<Long> usersIds){
        return ResponseEntity.ok(userService.getUsersForLikeModal(usersIds));
    }
}
