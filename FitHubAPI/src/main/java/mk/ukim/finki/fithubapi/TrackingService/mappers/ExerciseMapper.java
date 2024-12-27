package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseDto;
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

    public static Exercise toEntity(ExerciseDto dto) {
        if (dto == null) {
            return null;
        }

        Exercise exercise = new Exercise();
        exercise.setId(dto.getId());
        exercise.setName(dto.getName());
        exercise.setForce(dto.getForce());
        exercise.setLevel(dto.getLevel());
        exercise.setMechanic(dto.getMechanic());
        exercise.setEquipment(dto.getEquipment());
        exercise.setCategory(dto.getCategory());
        exercise.setPrimaryMuscles(dto.getPrimaryMuscles());
        exercise.setSecondaryMuscles(dto.getSecondaryMuscles());
        exercise.setInstructions(dto.getInstructions());
        exercise.setImages(dto.getImages());

        return exercise;
    }

    public static List<ExerciseDto> toDtoList(List<Exercise> exercises) {
        return exercises.stream()
                .map(ExerciseMapper::toDto)
                .collect(Collectors.toList());
    }
}
