package mk.ukim.finki.fithubapi.UserService.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import mk.ukim.finki.fithubapi.UserService.enums.ActivityLevel;
import mk.ukim.finki.fithubapi.UserService.enums.Gender;
import mk.ukim.finki.fithubapi.UserService.enums.Goal;
import mk.ukim.finki.fithubapi.UserService.enums.Unit;

import java.time.LocalDate;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    @Nullable
    private Long professionalTrainerId;
    private String email;
    private Double height;
    private Double weight;
    private LocalDate birthDate;
    private Goal goal;
    private ActivityLevel activityLevel;
    private Gender gender;
    private Unit unit;
    private String avatar;
    private String bio;
    private Integer dailyCalories;
    private String oauth2Id;
    private Integer numFollowers;
    private Integer numFollowing;
    private Integer numPosts;
}
