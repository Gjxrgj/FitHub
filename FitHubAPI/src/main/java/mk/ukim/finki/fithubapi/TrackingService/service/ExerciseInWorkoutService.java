package mk.ukim.finki.fithubapi.TrackingService.service;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;

public interface ExerciseInWorkoutService {

    ExerciseInWorkoutDto addExerciseInWorkout(UpsertExerciseInWorkoutDto exerciseInWorkoutDto);
}
