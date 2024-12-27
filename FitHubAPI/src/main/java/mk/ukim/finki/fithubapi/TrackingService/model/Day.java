package mk.ukim.finki.fithubapi.TrackingService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Day {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private LocalDate date;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<MealTrack> meals = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Workout> workouts = new ArrayList<>();

    public Day(Long userId, LocalDate date) {
        this.userId = userId;
        this.date = date;
        meals = new ArrayList<>();
    }

    public void addMeal(MealTrack mealTrack) {
        meals.add(mealTrack);
    }
}
