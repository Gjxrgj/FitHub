package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;

import java.util.List;

@Data
public class ExerciseDto {
    private Long id;
    private String name;
    private String force;
    private String level;
    private String mechanic;
    private String equipment;
    private ExerciseCategory category;
    private List<String> primaryMuscles;
    private List<String> secondaryMuscles;
    private List<String> instructions;
    private List<String> images;
}
