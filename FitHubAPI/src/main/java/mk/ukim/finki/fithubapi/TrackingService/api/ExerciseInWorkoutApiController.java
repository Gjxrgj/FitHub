package mk.ukim.finki.fithubapi.TrackingService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseInWorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/editMultiple")
    public ResponseEntity<WorkoutDto> editMultiple(@RequestBody List<ExerciseInWorkoutDto> exercises) {
        return ResponseEntity.ok(exerciseInWorkoutService.editMultiple(exercises));
    }
    @PostMapping("/addMultiple")
    public ResponseEntity<WorkoutDto> addMultiple(@RequestBody List<UpsertExerciseInWorkoutDto> exercises) {
        return ResponseEntity.ok(exerciseInWorkoutService.addMultiple(exercises));
    }

    @DeleteMapping("/{exerciseId}")
    public ResponseEntity<Long> removeExerciseFromWorkout(@PathVariable @NotNull Long exerciseId) {
        return ResponseEntity.ok(exerciseInWorkoutService.removeExercise(exerciseId));
    }
}
