package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.UserService.enums.ActivityLevel;
import mk.ukim.finki.fithubapi.UserService.enums.Goal;

import java.time.LocalDate;

@Data
public class UpdatePersonalInfoDto {
    private String firstName;
    private String lastName;
    private Double weight;
    private Double height;
    private LocalDate birthDate;
    private Goal goal;
    private ActivityLevel activityLevel;
}
