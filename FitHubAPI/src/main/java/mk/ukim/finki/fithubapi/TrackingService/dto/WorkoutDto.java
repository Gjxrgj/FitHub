package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class WorkoutDto {
    private Long id;
    private String name;
    private List<ExerciseInWorkoutDto> exercises;
    private LocalDate dayDate;
}
