package mk.ukim.finki.fithubapi.TrackingService.service;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;

import java.util.List;

public interface ExerciseInWorkoutService {

    ExerciseInWorkoutDto addExerciseInWorkout(UpsertExerciseInWorkoutDto exerciseInWorkoutDto);

    Long removeExercise(Long exerciseId);

    WorkoutDto editMultiple(List<ExerciseInWorkoutDto> exercises);

    WorkoutDto addMultiple(List<UpsertExerciseInWorkoutDto> exercises);
}
