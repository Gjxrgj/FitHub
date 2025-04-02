package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
import mk.ukim.finki.fithubapi.VenueService.enums.FoodCategory;

import java.util.List;

@Data

public class UpsertMealDto {
    @NotNull
    private String name;
    @NotNull
    private Double calories;
    @NotNull
    private Double proteins;
    @NotNull
    private Double fats;
    @NotNull
    private Double carbs;
    @NotNull
    private Double price;
    @NotNull
    private Currency currency;
    @Nullable
    private Double milliliters;
    @NotNull
    private FoodCategory category;
    @NotNull
    private List<UpsertIngredientDto> ingredients;
}
