package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.mappers.ExerciseInWorkoutMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseInWorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.WorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseInWorkoutService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ExerciseInWorkoutServiceImpl implements ExerciseInWorkoutService {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseInWorkoutRepository exerciseInWorkoutRepository;
    @Override
    @Transactional
    public ExerciseInWorkoutDto addExerciseInWorkout(UpsertExerciseInWorkoutDto exerciseInWorkoutDto) {
        Workout workout = workoutRepository.findById(exerciseInWorkoutDto.getWorkoutId())
                .orElseThrow(() -> new NoSuchElementException("Workout with ID " + exerciseInWorkoutDto.getWorkoutId() + " not found."));

        Exercise exercise = exerciseRepository.findById(exerciseInWorkoutDto.getExerciseId())
                .orElseThrow(() -> new NoSuchElementException("Exercise with ID " + exerciseInWorkoutDto.getExerciseId() + " not found."));

        ExerciseInWorkout exerciseInWorkout = ExerciseInWorkoutMapper.toEntity(exerciseInWorkoutDto, exercise, workout);

        ExerciseInWorkout savedExerciseInWorkout = exerciseInWorkoutRepository.save(exerciseInWorkout);

        workout.addExerciseInWorkout(exerciseInWorkout);
        workoutRepository.save(workout);

        exercise.addExerciseInWorkout(exerciseInWorkout);
        exerciseRepository.save(exercise);

        return ExerciseInWorkoutMapper.toDto(savedExerciseInWorkout);
    }
}
