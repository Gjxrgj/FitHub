package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
import mk.ukim.finki.fithubapi.VenueService.enums.FoodCategory;

import java.util.List;

@Data
public class MealDto {
    private Long id;
    private String name;
    private Double calories;
    private Double proteins;
    private Double fats;
    private Double carbs;
    private Double price;
    private Currency currency;
    private Double milliliters;
    private FoodCategory category;
    private List<IngredientDto> ingredients;
}
