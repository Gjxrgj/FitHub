package mk.ukim.finki.venueservice.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.GymDto;
import mk.ukim.finki.venueservice.dto.UpsertGymDto;
import mk.ukim.finki.venueservice.service.GymService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gym")
public class GymApiController {
    private final GymService gymService;

    public GymApiController(GymService gymService) {
        this.gymService = gymService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GymDto> getById(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.getById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<GymDto>> getAllByLocation(
            @RequestParam Double latitude,
            @RequestParam Double longitude
    ) {
        return ResponseEntity.ok(gymService.getAllByLocation(latitude, longitude));
    }

    @PostMapping("/add")
    public ResponseEntity<GymDto> addGym(@RequestParam @NotNull @Valid UpsertGymDto gym) {
        return ResponseEntity.ok(gymService.add(gym));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<GymDto> editGym(
            @RequestParam @NotNull @Valid UpsertGymDto gym,
            @PathVariable @NotNull Long id
    ) {
        return ResponseEntity.ok(gymService.edit(gym, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteGym(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.delete(id));
    }
}
