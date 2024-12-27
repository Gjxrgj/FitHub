package mk.ukim.finki.fithubapi.UserService.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import mk.ukim.finki.fithubapi.UserService.validation.ValidPassword;

@Data
public class LoginRequest {
    @NotNull(message = "Username can't be null.")
    @NotBlank(message = "Username can't be blank.")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
    private String username;
    @ValidPassword(message = "Password not valid.")
    private String password;
}
