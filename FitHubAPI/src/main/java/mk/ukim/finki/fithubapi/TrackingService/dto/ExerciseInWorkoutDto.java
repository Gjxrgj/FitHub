package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;

@Data
public class ExerciseInWorkoutDto {
    private Long Id;
    private Long exerciseId;
    private String name;
    private Integer reps;
    private Integer sets;
    private Float weight;
    private Float timeInMins;
}
