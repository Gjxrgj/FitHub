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
    private Boolean userCreated;
    @ManyToOne
    @JoinColumn(name = "meal_track_id")
    @JsonIgnore
    private MealTrack meal;

    public FoodItem(Long userId, String name, Double caloriesPer100g, Double proteinsPer100g, Double fatsPer100g, Double carbsPer100g, Double quantity, Boolean userCreated, MealTrack meal) {
        this.userId = userId;
        this.name = name;
        this.caloriesPer100g = caloriesPer100g;
        this.proteinsPer100g = proteinsPer100g;
        this.fatsPer100g = fatsPer100g;
        this.carbsPer100g = carbsPer100g;
        this.quantity = quantity;
        this.userCreated = userCreated;
        this.meal = meal;
    }
}
