package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.FoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertFoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.model.FoodItem;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;

import java.util.List;
import java.util.stream.Collectors;

public class FoodItemMapper {

    public static FoodItem toEntity(UpsertFoodItemDto dto, MealTrack mealTrack) {
        FoodItem foodItem = new FoodItem();
        foodItem.setUserId(dto.getUserId());
        foodItem.setName(dto.getName());
        foodItem.setCaloriesPer100g(dto.getCaloriesPer100g());
        foodItem.setProteinsPer100g(dto.getProteinsPer100g());
        foodItem.setFatsPer100g(dto.getFatsPer100g());
        foodItem.setCarbsPer100g(dto.getCarbsPer100g());
        foodItem.setQuantity(dto.getQuantity());
        foodItem.setMeal(mealTrack);

        return foodItem;
    }

    public static FoodItemDto toDto(FoodItem foodItem) {
        FoodItemDto dto = new FoodItemDto();
        dto.setId(foodItem.getId());
        dto.setUserId(foodItem.getUserId());
        dto.setMealType(foodItem.getMeal().getMealType());
        dto.setName(foodItem.getName());
        dto.setCaloriesPer100g(foodItem.getCaloriesPer100g());
        dto.setProteinsPer100g(foodItem.getProteinsPer100g());
        dto.setFatsPer100g(foodItem.getFatsPer100g());
        dto.setCarbsPer100g(foodItem.getCarbsPer100g());
        dto.setQuantity(foodItem.getQuantity());

        return dto;
    }

    public static List<FoodItemDto> toDtoList(List<FoodItem> foodItems) {
        return foodItems.stream()
                .map(FoodItemMapper::toDto)
                .collect(Collectors.toList());
    }
}
