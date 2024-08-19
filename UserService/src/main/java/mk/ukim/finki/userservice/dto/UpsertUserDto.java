package mk.ukim.finki.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpsertUserDto {
    @NotBlank
    @Size(min = 3, max = 30)
    private String username;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 6)
    private String password;
    private byte[] avatar;
    private String bio;
}