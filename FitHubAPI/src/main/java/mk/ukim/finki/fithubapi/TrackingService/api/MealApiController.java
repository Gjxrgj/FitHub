package mk.ukim.finki.fithubapi.TrackingService.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.MealTrackDto;
import mk.ukim.finki.fithubapi.TrackingService.service.MealTrackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/mealTrack")
public class MealApiController {
    private final MealTrackService mealTrackService;

    @GetMapping("/{id}")
    public ResponseEntity<MealTrackDto> getById(
            @PathVariable @NotNull Long id) {
        return ResponseEntity.ok(mealTrackService.getMealById(id));
    }

    @GetMapping("/getAllForDay/{userId}")
    public ResponseEntity<List<MealTrackDto>> getMealsForDay(@PathVariable @NotNull Long userId,
                                                             @RequestParam @NotNull LocalDate dayDate) {
        return ResponseEntity.ok(mealTrackService.getMealsForDay(userId, dayDate));
    }

    @GetMapping("/getRecentMeals/{userId}")
    public ResponseEntity<List<MealTrackDto>> getRecentMeals(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(mealTrackService.getRecentMeals(userId));
    }
}

