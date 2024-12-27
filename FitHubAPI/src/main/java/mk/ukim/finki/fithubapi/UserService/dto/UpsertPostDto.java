package mk.ukim.finki.fithubapi.UserService.dto;

import lombok.Data;

@Data
public class UpsertPostDto {
    private Long userId;
    private String title;
    private String description;
    private String image;
    private Long mealId;
    private Long workoutId;
}
