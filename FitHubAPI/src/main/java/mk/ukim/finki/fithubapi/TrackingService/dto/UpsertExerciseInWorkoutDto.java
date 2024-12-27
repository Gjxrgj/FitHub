package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;

@Data
public class UpsertExerciseInWorkoutDto {
    private Integer reps;
    private Integer sets;
    private Float weight;
    private Float timeInMins;
    private Long exerciseId;
    private Long workoutId;
}

