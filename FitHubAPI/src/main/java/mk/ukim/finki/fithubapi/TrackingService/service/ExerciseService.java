package mk.ukim.finki.fithubapi.TrackingService.service;

import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;

import java.util.List;

public interface ExerciseService {
    boolean isDatabaseEmpty();

    List<ExerciseDto> getAllBySearchAndCategory(String search, ExerciseCategory category);

    List<ExerciseDto> getRecentExercises(Long userId);
}
