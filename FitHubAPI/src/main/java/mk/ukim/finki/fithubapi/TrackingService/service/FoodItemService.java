package mk.ukim.finki.fithubapi.TrackingService.service;

import mk.ukim.finki.fithubapi.TrackingService.dto.FoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertFoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.enums.MealType;

import java.time.LocalDate;
import java.util.List;

public interface FoodItemService {
    List<FoodItemDto> addFoodItemToMeal(LocalDate dayDate, UpsertFoodItemDto upsertFoodItemDto);

    Long remove(Long id);

    FoodItemDto getById(Long id);

    List<FoodItemDto> addMultipleFoodItems(LocalDate dayDate, List<UpsertFoodItemDto> upsertFoodItems);

    FoodItemDto createFoodItem(UpsertFoodItemDto upsertFoodItemDto);

    List<FoodItemDto> getAllUserCreatedFoodItems(Long userId);

}
