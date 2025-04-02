package mk.ukim.finki.fithubapi.TrackingService.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseLevel;
import mk.ukim.finki.fithubapi.TrackingService.enums.Force;
import mk.ukim.finki.fithubapi.TrackingService.enums.Mechanic;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@JsonIgnoreProperties({"id"})
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    @Enumerated(EnumType.STRING)
    private Force force;
    @Enumerated(EnumType.STRING)
    private ExerciseLevel level;
    @Enumerated(EnumType.STRING)
    private Mechanic mechanic;
    private String equipment;
    @Enumerated(EnumType.STRING)
    private ExerciseCategory category;
    @ElementCollection
    private List<String> primaryMuscles;
    @ElementCollection
    private List<String> secondaryMuscles;
    @ElementCollection
    @Column(length = 1000)
    private List<String> instructions;
    @ElementCollection
    private List<String> images;
}
