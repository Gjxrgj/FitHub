package mk.ukim.finki.fithubapi.TrackingService.api;

import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.FoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertFoodItemDto;
import mk.ukim.finki.fithubapi.TrackingService.service.FoodItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/foodItem")
public class FoodItemApiController {
    private final FoodItemService foodItemService;

    @PostMapping("/add")
    public ResponseEntity<List<FoodItemDto>> addFoodItemToMeal(@RequestBody UpsertFoodItemDto upsertFoodItemDto,
                                                               @RequestParam LocalDate dayDate) {
        return ResponseEntity.ok(foodItemService.addFoodItemToMeal(dayDate, upsertFoodItemDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> removeFoodItem(@PathVariable Long id){
        return ResponseEntity.ok(foodItemService.remove(id));
    }

}

