package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;

import java.util.List;
import java.util.stream.Collectors;


public class ExerciseMapper {

    public static ExerciseDto toDto(Exercise exercise) {
        if (exercise == null) {
            return null;
        }

        ExerciseDto dto = new ExerciseDto();
        dto.setName(exercise.getName());
        dto.setId(exercise.getId());
        dto.setForce(exercise.getForce());
        dto.setLevel(exercise.getLevel());
        dto.setMechanic(exercise.getMechanic());
        dto.setEquipment(exercise.getEquipment());
        dto.setCategory(exercise.getCategory());
        dto.setPrimaryMuscles(exercise.getPrimaryMuscles());
        dto.setSecondaryMuscles(exercise.getSecondaryMuscles());
        dto.setInstructions(exercise.getInstructions());
        dto.setImages(exercise.getImages());

        return dto;
    }

    public static Exercise toEntity(UpsertExerciseDto dto) {
        if (dto == null) {
            return null;
        }

        Exercise exercise = new Exercise();
        exercise.setUserId(dto.getUserId());
        exercise.setName(dto.getName());
        exercise.setForce(dto.getForce());
        exercise.setLevel(dto.getLevel());
        exercise.setMechanic(dto.getMechanic());
        exercise.setCategory(dto.getCategory());
        exercise.setPrimaryMuscles(dto.getPrimaryMuscles());
        exercise.setSecondaryMuscles(dto.getSecondaryMuscles());
        exercise.setInstructions(List.of(dto.getInstructions()));

        return exercise;
    }

    public static List<ExerciseDto> toDtoList(List<Exercise> exercises) {
        return exercises.stream()
                .map(ExerciseMapper::toDto)
                .collect(Collectors.toList());
    }
}
