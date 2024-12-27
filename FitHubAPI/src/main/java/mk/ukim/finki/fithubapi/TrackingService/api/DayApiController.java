package mk.ukim.finki.fithubapi.TrackingService.api;

import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.service.DayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@AllArgsConstructor
@RequestMapping("/api/day")
public class DayApiController {
    private final DayService dayService;

    @GetMapping("/calorieIntakeForDay")
    public ResponseEntity<Integer> getDailyIngestedCalories(@RequestParam LocalDate dayDate) {
        return ResponseEntity.ok(dayService.getDailyIngestedCalories(dayDate));
    }
}
