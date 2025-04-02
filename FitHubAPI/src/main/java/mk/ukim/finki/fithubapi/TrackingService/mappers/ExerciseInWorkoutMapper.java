package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;

import java.util.List;
import java.util.NoSuchElementException;

public class ExerciseInWorkoutMapper {

    public static ExerciseInWorkout toEntity(UpsertExerciseInWorkoutDto dto, Exercise exercise, Workout workout) {
        ExerciseInWorkout exerciseInWorkout = new ExerciseInWorkout();
        exerciseInWorkout.setName(exercise.getName());
        exerciseInWorkout.setReps(dto.getReps());
        exerciseInWorkout.setSets(dto.getSets());
        exerciseInWorkout.setWeight(dto.getWeight());
        exerciseInWorkout.setTimeInMins(dto.getTimeInMins());
        exerciseInWorkout.setExercise(exercise);
        exerciseInWorkout.setWorkout(workout);
        return exerciseInWorkout;
    }

    public static List<ExerciseInWorkout> toEntityList(List<UpsertExerciseInWorkoutDto> dtoList, List<Exercise> exercises, Workout workout) {
        return dtoList.stream()
                .map(dto -> toEntity(dto,
                        exercises.stream().filter(e -> e.getId().equals(dto.getExerciseId())).findFirst()
                        .orElseThrow(() -> new NoSuchElementException("Exercise with that id wasn't found. " + dto.getExerciseId())),
                        workout))
                .toList();

    }

    public static ExerciseInWorkoutDto toDto(ExerciseInWorkout exerciseInWorkout) {
        ExerciseInWorkoutDto exerciseInWorkoutdto = new ExerciseInWorkoutDto();
        exerciseInWorkoutdto.setId(exerciseInWorkout.getId());
        exerciseInWorkoutdto.setExerciseId(exerciseInWorkout.getExercise().getId());
        exerciseInWorkoutdto.setName(exerciseInWorkout.getName());
        exerciseInWorkoutdto.setReps(exerciseInWorkout.getReps());
        exerciseInWorkoutdto.setSets(exerciseInWorkout.getSets());
        exerciseInWorkoutdto.setWeight(exerciseInWorkout.getWeight());
        exerciseInWorkoutdto.setTimeInMins(exerciseInWorkout.getTimeInMins());
        return exerciseInWorkoutdto;
    }

    public static List<ExerciseInWorkoutDto> toDtoList(List<ExerciseInWorkout> exercises) {
        return exercises.stream().map(ExerciseInWorkoutMapper::toDto).toList();
    }
}
