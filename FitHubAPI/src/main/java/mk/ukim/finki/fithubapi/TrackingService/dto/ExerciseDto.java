package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseLevel;
import mk.ukim.finki.fithubapi.TrackingService.enums.Force;
import mk.ukim.finki.fithubapi.TrackingService.enums.Mechanic;

import java.util.List;

@Data
public class ExerciseDto {
    private Long id;
    private String name;
    private Force force;
    private ExerciseLevel level;
    private Mechanic mechanic;
    private String equipment;
    private ExerciseCategory category;
    private List<String> primaryMuscles;
    private List<String> secondaryMuscles;
    private List<String> instructions;
    private List<String> images;
}
