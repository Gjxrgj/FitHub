package mk.ukim.finki.fithubapi.TrackingService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(fetch = FetchType.EAGER)
    private List<ExerciseInWorkout> exercises;
    @ManyToOne
    private Day day;

    public void addExerciseInWorkout(ExerciseInWorkout exerciseInWorkout) {
        if (exercises == null) {
            this.exercises = new ArrayList<>();
        }
        this.exercises.add(exerciseInWorkout);
    }
}
