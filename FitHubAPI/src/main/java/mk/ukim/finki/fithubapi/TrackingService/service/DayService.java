package mk.ukim.finki.fithubapi.TrackingService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;

import java.time.LocalDate;

public interface DayService {
    Day getOrCreateDay(@NotNull LocalDate date, @NotNull Long userId);

    Integer getDailyIngestedCalories(LocalDate dayDate);
}
