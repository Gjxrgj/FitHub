package mk.ukim.finki.fithubapi.UserService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.LoginRequest;
import mk.ukim.finki.fithubapi.UserService.dto.UpsertUserDto;
import mk.ukim.finki.fithubapi.UserService.dto.UserDto;
import mk.ukim.finki.fithubapi.UserService.service.UserService;
import mk.ukim.finki.fithubapi.UserService.service.implementation.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthApiController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody @NotNull @Valid UpsertUserDto userDto) {
        return ResponseEntity.ok(userService.register(userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @NotNull @Valid LoginRequest loginRequest) {
        String token = authenticationService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(token);
    }
}

