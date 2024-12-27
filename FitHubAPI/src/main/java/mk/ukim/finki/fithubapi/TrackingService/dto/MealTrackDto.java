package mk.ukim.finki.fithubapi.TrackingService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;

import java.time.LocalDate;
import java.util.List;

@Data
public class MealTrackDto {
    private Long id;
    private MealType mealType;
    private List<FoodItemDto> foodItems;
    private LocalDate dayDate;
}

