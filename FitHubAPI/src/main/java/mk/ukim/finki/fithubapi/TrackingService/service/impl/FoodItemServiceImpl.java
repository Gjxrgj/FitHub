package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.FoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertFoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.mappers.FoodItemMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;
import mk.ukim.finki.fithubapi.TrackingService.model.FoodItem;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;
import mk.ukim.finki.fithubapi.TrackingService.repository.DayRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.FoodItemRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.MealTrackRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.DayService;
import mk.ukim.finki.fithubapi.TrackingService.service.FoodItemService;
import mk.ukim.finki.fithubapi.UserService.exceptions.RoleNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor

public class FoodItemServiceImpl implements FoodItemService {
    private final FoodItemRepository foodItemRepository;
    private final DayRepository dayRepository;
    private final DayService dayService;
    private final MealTrackRepository mealTrackRepository;

    @Override
    @Transactional
    public List<FoodItemDto> addFoodItemToMeal(LocalDate dayDate, UpsertFoodItemDto upsertFoodItemDto) {
        Day usersDayByDate = dayService.getOrCreateDay(dayDate, upsertFoodItemDto.getUserId());
        Optional<MealTrack> mealOfType = usersDayByDate.getMeals().stream()
                .filter(meal -> meal.getMealType() == upsertFoodItemDto.getMealType())
                .findFirst();

        if (mealOfType.isPresent()) {
            MealTrack meal = mealOfType.get();
            FoodItem foodItem = FoodItemMapper.toEntity(upsertFoodItemDto, meal);
            foodItem.setUserCreated(false);
            meal.addFoodItem(foodItem);
            MealTrack savedMeal = mealTrackRepository.save(meal);

            return FoodItemMapper.toDtoList(savedMeal.getFoodItems());
        }

        MealTrack newMealTrack = new MealTrack(upsertFoodItemDto.getMealType(), usersDayByDate);
        FoodItem foodItem = FoodItemMapper.toEntity(upsertFoodItemDto, newMealTrack);
        foodItem.setUserCreated(false);
        newMealTrack.addFoodItem(foodItem);
        MealTrack savedMeal = mealTrackRepository.save(newMealTrack);

        usersDayByDate.addMeal(savedMeal);
        dayRepository.save(usersDayByDate);

        return FoodItemMapper.toDtoList(savedMeal.getFoodItems());
    }

    @Override
    @Transactional
    public List<FoodItemDto> addMultipleFoodItems(LocalDate dayDate, List<UpsertFoodItemDto> upsertFoodItems) {
        if (upsertFoodItems.isEmpty()) {
            return new ArrayList<>();
        }

        Day usersDayByDate = dayService.getOrCreateDay(dayDate, upsertFoodItems.get(0).getUserId());
        Optional<MealTrack> mealOfType = usersDayByDate.getMeals().stream()
                .filter(meal -> meal.getMealType() == upsertFoodItems.get(0).getMealType())
                .findFirst();

        if (mealOfType.isPresent()) {
            MealTrack meal = mealOfType.get();
            meal.addMultipleFoodItems(FoodItemMapper.toEntityList(upsertFoodItems, meal));
            MealTrack savedMeal = mealTrackRepository.save(meal);

            return FoodItemMapper.toDtoList(savedMeal.getFoodItems());
        }

        MealTrack newMealTrack = new MealTrack(upsertFoodItems.get(0).getMealType(), usersDayByDate);
        newMealTrack.addMultipleFoodItems(FoodItemMapper.toEntityList(upsertFoodItems, newMealTrack));
        MealTrack savedMeal = mealTrackRepository.save(newMealTrack);

        usersDayByDate.addMeal(savedMeal);
        dayRepository.save(usersDayByDate);

        return FoodItemMapper.toDtoList(savedMeal.getFoodItems());
    }

    @Override
    @Transactional
    public FoodItemDto createFoodItem(UpsertFoodItemDto upsertFoodItemDto) {
        FoodItem foodItem = FoodItemMapper.toEntity(upsertFoodItemDto, null);
        foodItem.setUserCreated(true);

        return FoodItemMapper.toDto(foodItemRepository.save(foodItem));
    }

    @Override
    public List<FoodItemDto> getAllUserCreatedFoodItems(Long userId) {
        List<FoodItem> foodItems = foodItemRepository.findAllByUserIdAndUserCreatedTrue(userId);

        return FoodItemMapper.toDtoList(foodItems);
    }

    @Override
    @Transactional
    public Long remove(Long id) {
        if (foodItemRepository.findById(id).isPresent()) {
            FoodItem foodItemToDelete = foodItemRepository.findById(id).get();
            MealTrack meal = foodItemToDelete.getMeal();
            meal.removeFoodItem(foodItemToDelete);
            mealTrackRepository.save(meal);
            foodItemRepository.deleteById(id);
            return id;
        } else {
            throw new NoSuchElementException("Food item with id " + id + " not found.");
        }
    }

    @Override
    public FoodItemDto getById(Long id) {
        return FoodItemMapper.toDto(foodItemRepository.findById(id)
                .orElseThrow(() -> new RoleNotFoundException("Food item with id" + id + " doesn't exist.")));
    }
}
