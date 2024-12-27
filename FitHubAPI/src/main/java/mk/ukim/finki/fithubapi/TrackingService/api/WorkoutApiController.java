package mk.ukim.finki.fithubapi.TrackingService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/workout")
public class WorkoutApiController {
    private final WorkoutService workoutService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<WorkoutDto> addWorkout(
            @RequestBody @NotNull @Valid UpsertWorkoutDto upsertWorkoutDto,
            @PathVariable @NotNull Long userId
    ) {
        return ResponseEntity.ok(workoutService.addWorkout(upsertWorkoutDto, userId));
    }

    @GetMapping("/getByDateOrName/{userId}")
    public ResponseEntity<List<WorkoutDto>> getWorkoutsByDateOrName(
            @PathVariable @NotNull Long userId,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) String workoutName){
        return ResponseEntity.ok(workoutService.getWorkoutsByDateOrName(userId, date, workoutName));
    }
}
