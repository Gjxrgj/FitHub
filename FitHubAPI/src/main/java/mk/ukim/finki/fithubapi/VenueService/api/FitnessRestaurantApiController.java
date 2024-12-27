package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.dto.MenuDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertMealDto;
import mk.ukim.finki.fithubapi.VenueService.service.FitnessRestaurantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fitness_restaurant")
public class FitnessRestaurantApiController {
    private final FitnessRestaurantService fitnessRestaurantService;

    public FitnessRestaurantApiController(FitnessRestaurantService fitnessRestaurantService) {
        this.fitnessRestaurantService = fitnessRestaurantService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessRestaurantDto> getById(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(fitnessRestaurantService.getById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<FitnessRestaurantDto>> getAllByLocation(
            @RequestParam Double latitude,
            @RequestParam Double longitude
    ) {
        return ResponseEntity.ok(fitnessRestaurantService.getAllByLocation(latitude, longitude));
    }

    @PostMapping("/add")
    public ResponseEntity<FitnessRestaurantDto> addFitnessRestaurant(
            @RequestBody @NotNull @Valid UpsertFitnessRestaurantDto fitnessRestaurantDto
    ) {
        return ResponseEntity.ok(fitnessRestaurantService.add(fitnessRestaurantDto));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<FitnessRestaurantDto> editFitnessRestaurant(
            @RequestBody @NotNull @Valid UpsertFitnessRestaurantDto fitnessRestaurantDto,
            @PathVariable @NotNull Long id
    ) {
        return ResponseEntity.ok(fitnessRestaurantService.edit(fitnessRestaurantDto, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteFitnessRestaurant(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(fitnessRestaurantService.delete(id));
    }

    @PostMapping("/addMeal/{id}")
    public ResponseEntity<MenuDto> addMealToMenu(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull @Valid UpsertMealDto upsertMealDto) {
        return ResponseEntity.ok(fitnessRestaurantService.addMealToMenu(id, upsertMealDto));
    }

    @DeleteMapping("/removeMeal/{id}")
    public ResponseEntity<MenuDto> removeMeal(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(fitnessRestaurantService.removeMeal(id));
    }
}
