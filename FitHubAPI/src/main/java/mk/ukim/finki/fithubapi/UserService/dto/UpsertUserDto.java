package mk.ukim.finki.fithubapi.UserService.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import mk.ukim.finki.fithubapi.UserService.enums.ActivityLevel;
import mk.ukim.finki.fithubapi.UserService.enums.Gender;
import mk.ukim.finki.fithubapi.UserService.enums.Goal;
import mk.ukim.finki.fithubapi.UserService.enums.Unit;

import java.time.LocalDate;

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
    @Email
    private String email;
    @NotBlank
    @Size(min = 6)
    private String password;
    private String repeatPassword;
    private String avatar;
    private String bio;
    @NotNull
    private Double weight;
    @NotNull
    private Double height;
    @NotNull
    private LocalDate birthDate;
    @NotNull
    private Unit units;
    @NotNull
    private Gender gender;
    @NotNull
    private Goal goal;
    @NotNull
    private ActivityLevel activityLevel;
}
