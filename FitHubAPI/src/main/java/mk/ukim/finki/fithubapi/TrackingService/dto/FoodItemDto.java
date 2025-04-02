package mk.ukim.finki.fithubapi.TrackingService.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;

@Data
public class FoodItemDto {
    private Long id;
    private Long userId;
    @Nullable
    private MealType mealType;
    private String name;
    private Double caloriesPer100g;
    private Double proteinsPer100g;
    private Double fatsPer100g;
    private Double carbsPer100g;
    private Double quantity;
}
