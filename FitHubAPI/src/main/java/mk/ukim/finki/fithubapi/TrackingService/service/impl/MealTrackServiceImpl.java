package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.FoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.MealTrackDto;
import mk.ukim.finki.fithubapi.TrackingService.mappers.MealTrackMapper;
import mk.ukim.finki.fithubapi.TrackingService.repository.MealTrackRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.MealTrackService;
import mk.ukim.finki.fithubapi.UserService.exceptions.UserNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MealTrackServiceImpl implements MealTrackService {
    private final MealTrackRepository mealTrackRepository;
    @Override
    public List<MealTrackDto> getMealsForDay(@NotNull Long userId, @NotNull LocalDate dayDate) {
        return MealTrackMapper.toDtoList(mealTrackRepository.findAllByDay_DateAndDay_UserId(dayDate, userId));
    }
    @Override
    public List<MealTrackDto> getRecentMeals(@NotNull Long userId) {
        List<MealTrackDto> mealTracks = MealTrackMapper.toDtoList(mealTrackRepository.findRecentMealTracks(userId, LocalDate.now().minusWeeks(2)));

        Map<String, FoodItemDto> uniqueFoodItemsMap = new HashMap<>();

        mealTracks.forEach(mealTrack -> {
            List<FoodItemDto> uniqueFoodItems = mealTrack.getFoodItems().stream()
                    .filter(foodItem -> uniqueFoodItemsMap.putIfAbsent(foodItem.getName(), foodItem) == null)
                    .collect(Collectors.toList());

            mealTrack.setFoodItems(uniqueFoodItems);
        });

        return mealTracks;
    }

    @Override
    public MealTrackDto getMealById(Long id) {
        return MealTrackMapper.toDto(mealTrackRepository.findById(id).orElseThrow(() -> new UserNotFoundException("MealTrack not found with id: " + id)));
    }
}
