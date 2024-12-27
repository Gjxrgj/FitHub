package mk.ukim.finki.fithubapi.TrackingService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class ExerciseInWorkout {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private Integer reps;
    private Integer sets;
    private Float weight;
    private Float timeInMins;
    @ManyToOne
    private Exercise exercise;
    @ManyToOne
    private Workout workout;
}
