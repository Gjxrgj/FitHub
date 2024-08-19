package mk.ukim.finki.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import mk.ukim.finki.userservice.validation.ValidPassword;

@Data
public class LoginRequest {
    @NotNull
    @NotBlank
    @Size(min = 3, max = 30)
    private String username;
    @ValidPassword
    private String password;
}