package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.mappers.ExerciseInWorkoutMapper;
import mk.ukim.finki.fithubapi.TrackingService.mappers.WorkoutMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseInWorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.WorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseInWorkoutService;
import org.springframework.stereotype.Service;

import java.util.List;
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
        exerciseRepository.save(exercise);

        return ExerciseInWorkoutMapper.toDto(savedExerciseInWorkout);
    }

    @Override
    @Transactional
    public Long removeExercise(Long exerciseId) {
        ExerciseInWorkout exercise = exerciseInWorkoutRepository.findById(exerciseId)
                .orElseThrow(() -> new NoSuchElementException("Exercise with id  " + exerciseId + " not found."));

        Workout workout = exercise.getWorkout();

        workout.getExercises().remove(exercise);

        exerciseInWorkoutRepository.save(exercise);
        workoutRepository.save(workout);
        return exerciseId;
    }

    @Override
    public WorkoutDto editMultiple(List<ExerciseInWorkoutDto> exercises) {
        List<ExerciseInWorkout> exercisesInWorkout = exerciseInWorkoutRepository
                .findAllByIdIn(exercises.stream().map(ExerciseInWorkoutDto::getId).toList());

        if (exercisesInWorkout.isEmpty()) {
            throw new NoSuchElementException("Error editing exercises");
        }

        for (ExerciseInWorkout exercise : exercisesInWorkout) {
            exercises.stream()
                    .filter(dto -> dto.getId().equals(exercise.getId()))
                    .findFirst()
                    .ifPresent(dto -> {
                        exercise.setReps(dto.getReps());
                        exercise.setSets(dto.getSets());
                        exercise.setWeight(dto.getWeight());
                        exercise.setTimeInMins(dto.getTimeInMins());
                    });
        }

        exerciseInWorkoutRepository.saveAll(exercisesInWorkout);

        return WorkoutMapper.toDto(exercisesInWorkout.stream().findFirst().get().getWorkout());
    }

    @Override
    @Transactional
    public WorkoutDto addMultiple(List<UpsertExerciseInWorkoutDto> exercises) {
        if (exercises.isEmpty()) {
            return null;
        }

        Workout workout = workoutRepository.findById(exercises.stream().findFirst().get().getWorkoutId())
                .orElseThrow(() -> new NoSuchElementException("No workout with " + exercises.stream().findFirst().get().getWorkoutId() + " id exits"));

        List<Exercise> exercisesFromDb = exerciseRepository.findAllByIdIn(exercises.stream().map(UpsertExerciseInWorkoutDto::getExerciseId).toList());

        List<ExerciseInWorkout> savedExercises = exerciseInWorkoutRepository.saveAll(ExerciseInWorkoutMapper.toEntityList(exercises, exercisesFromDb, workout));
        workout.setExercises(savedExercises);
        Workout savedWorkout = workoutRepository.save(workout);

        return WorkoutMapper.toDto(savedWorkout);
    }

}
