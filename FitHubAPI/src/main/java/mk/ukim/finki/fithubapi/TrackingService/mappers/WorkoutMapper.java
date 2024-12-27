package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;

import java.util.ArrayList;
import java.util.List;

public class WorkoutMapper {

    public static Workout toEntity(UpsertWorkoutDto upsertWorkoutDto, Day day) {
        Workout workout = new Workout();

        workout.setDay(day);
        workout.setExercises(new ArrayList<>());
        workout.setName(upsertWorkoutDto.getName());

        return workout;
    }

    public static WorkoutDto toDto(Workout workout) {
        WorkoutDto workoutDto = new WorkoutDto();

        workoutDto.setId(workout.getId());
        workoutDto.setName(workout.getName());
        workoutDto.setExercises(ExerciseInWorkoutMapper.toDtoList(workout.getExercises()));
        workoutDto.setDayDate(workout.getDay().getDate());

        return workoutDto;
    }

    public static List<WorkoutDto> toDtoList(List<Workout> workouts){
        return workouts.stream().map(WorkoutMapper::toDto).toList();
    }

}
