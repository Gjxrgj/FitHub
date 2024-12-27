package mk.ukim.finki.fithubapi.TrackingService.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;

@Data
public class FoodItemDto {
    private Long id;
    private Long userId;
    private MealType mealType;
    private String name;
    private Double caloriesPer100g;
    private Double proteinsPer100g;
    private Double fatsPer100g;
    private Double carbsPer100g;
    private Double quantity;
}
