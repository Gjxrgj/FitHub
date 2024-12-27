package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseInWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;

import java.util.List;

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

    public static ExerciseInWorkoutDto toDto(ExerciseInWorkout exerciseInWorkout) {
        ExerciseInWorkoutDto exerciseInWorkoutdto = new ExerciseInWorkoutDto();
        exerciseInWorkoutdto.setId(exerciseInWorkout.getId());
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
