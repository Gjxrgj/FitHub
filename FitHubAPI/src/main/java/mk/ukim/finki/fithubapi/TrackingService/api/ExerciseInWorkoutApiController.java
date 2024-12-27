package mk.ukim.finki.fithubapi.TrackingService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseInWorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/exerciseInWorkout")
public class ExerciseInWorkoutApiController {
    private final ExerciseInWorkoutService exerciseInWorkoutService;

    @PostMapping("/add")
    public ResponseEntity<ExerciseInWorkoutDto> addExerciseInWorkout(
            @RequestBody @NotNull @Valid UpsertExerciseInWorkoutDto exerciseInWorkoutDto
    ) {
        return ResponseEntity.ok(exerciseInWorkoutService.addExerciseInWorkout(exerciseInWorkoutDto));
    }
}
