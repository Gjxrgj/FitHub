package mk.ukim.finki.fithubapi.TrackingService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.dto.MealTrackDto;

import java.time.LocalDate;
import java.util.List;

public interface MealTrackService {
    List<MealTrackDto> getMealsForDay(@NotNull Long userId, @NotNull LocalDate dayDate);

    List<MealTrackDto> getRecentMeals(Long userId);
}
