package mk.ukim.finki.fithubapi.TrackingService.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;

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
    private String name;
    private String force;
    private String level;
    private String mechanic;
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
    @OneToMany
    private List<ExerciseInWorkout> exercisesInWorkouts;

    public void addExerciseInWorkout(ExerciseInWorkout exerciseInWorkout){
        if(exercisesInWorkouts == null) {
            this.exercisesInWorkouts = new ArrayList<>();
        }
        this.exercisesInWorkouts.add(exerciseInWorkout);
    }
}
