package mk.ukim.finki.fithubapi.TrackingService.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/exercises")
public class ExercisesApiController {
    private final ExerciseService exerciseService;

    @GetMapping
    public ResponseEntity<List<ExerciseDto>> getAllExercisesBySearchAndCategory(
            @RequestParam @NotNull String search,
            @RequestParam(required = false) ExerciseCategory category
    ) {
        return ResponseEntity.ok(exerciseService.getAllBySearchAndCategory(search, category));
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<ExerciseDto>> getAllCreatedByUser(
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(exerciseService.getAllCreatedByUser(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<ExerciseDto> createExercise(@RequestBody UpsertExerciseDto upsertExerciseDto) {
        return ResponseEntity.ok(exerciseService.createExercise(upsertExerciseDto));
    }

    @GetMapping("/recent/{userId}")
    public ResponseEntity<List<ExerciseDto>> getRecentExercises(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(exerciseService.getRecentExercises(userId));
    }
}
