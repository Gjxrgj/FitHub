package mk.ukim.finki.fithubapi.TrackingService.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;

@Data
public class UpsertFoodItemDto {
    @NotNull
    private Long userId;
    @NotNull
    private MealType mealType;
    @NotNull
    private String name;
    @NotNull
    private Double caloriesPer100g;
    @NotNull
    private Double proteinsPer100g;
    @NotNull
    private Double fatsPer100g;
    @NotNull
    private Double carbsPer100g;
    @NotNull
    private Double quantity;
}
