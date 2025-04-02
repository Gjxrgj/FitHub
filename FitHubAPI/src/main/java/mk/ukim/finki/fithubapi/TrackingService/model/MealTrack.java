package mk.ukim.finki.fithubapi.TrackingService.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class MealTrack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private MealType mealType;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<FoodItem> foodItems = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "day_id")
    @JsonIgnore
    private Day day;

    public MealTrack(MealType mealType, Day day) {
        this.mealType = mealType;
        this.day = day;
    }

    public void addFoodItem(FoodItem foodItem) {
        if (foodItem != null) {
            this.foodItems.add(foodItem);
        }
    }

    public void addMultipleFoodItems(List<FoodItem> foodItems){
        foodItems.forEach(this::addFoodItem);
    }
    public void removeFoodItem(FoodItem foodItem) {
        if (foodItem != null) {
            this.foodItems.remove(foodItem);
        }
    }
}
