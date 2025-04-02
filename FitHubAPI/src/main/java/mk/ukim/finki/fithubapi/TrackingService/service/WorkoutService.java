package mk.ukim.finki.fithubapi.TrackingService.service;

import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutService {
    WorkoutDto addWorkout(UpsertWorkoutDto upsertWorkoutDto, Long userId);

    List<WorkoutDto> getWorkoutsByDateOrName(Long userId, LocalDate date, String workoutName);

    WorkoutDto getWorkoutById(Long id);

    Long deleteWorkout(Long workoutId);
}
