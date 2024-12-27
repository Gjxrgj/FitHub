package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;
import mk.ukim.finki.fithubapi.TrackingService.model.FoodItem;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;
import mk.ukim.finki.fithubapi.TrackingService.repository.DayRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.DayService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class DayServiceImpl implements DayService {
    private final DayRepository dayRepository;

    @Override
    public Day getOrCreateDay(@NotNull LocalDate date, @NotNull Long userId) {
        Optional<Day> existingDay = dayRepository.findByDateAndUserId(date, userId);
        if (existingDay.isPresent()) {
            return existingDay.get();
        }
        Day newDay = new Day(userId, date);
        return dayRepository.save(newDay);
    }

    @Override
    public Integer getDailyIngestedCalories(@NotNull LocalDate dayDate) {
        Optional<Day> day = dayRepository.findDayByDate(dayDate);
        if (day.isPresent()) {
            List<MealTrack> mealTracks = day.get().getMeals();
            double sum = 0;
            for (MealTrack meal : mealTracks) {
                for (FoodItem item : meal.getFoodItems()) {
                    sum += (item.getCaloriesPer100g() / 100) * item.getQuantity();
                }
            }
            return (int) sum;
        }
        return 0;
    }
}
