package mk.ukim.finki.fithubapi.TrackingService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

@Data
@Entity
@NoArgsConstructor
public class FoodItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String name;
    private Double caloriesPer100g;
    private Double proteinsPer100g;
    private Double fatsPer100g;
    private Double carbsPer100g;
    private Double quantity;
    @ManyToOne
    @JoinColumn(name = "meal_track_id")
    @JsonIgnore
    private MealTrack meal;
}
