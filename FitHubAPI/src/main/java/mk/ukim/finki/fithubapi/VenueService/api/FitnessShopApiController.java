package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.AddFitnessShopRequest;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.service.FitnessShopService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fitness_shop")
public class FitnessShopApiController {
    private final FitnessShopService fitnessShopService;

    public FitnessShopApiController(FitnessShopService fitnessShopService) {
        this.fitnessShopService = fitnessShopService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FitnessShopDto> getById(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(fitnessShopService.getById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<FitnessShopDto>> getAllByLocation(
            @RequestParam Double latitude,
            @RequestParam Double longitude
    ) {
        return ResponseEntity.ok(fitnessShopService.getAllByLocation(latitude, longitude));
    }

    @PostMapping("/add")
    public ResponseEntity<FitnessShopDto> addFitnessShop(
            @RequestBody @NotNull @Valid AddFitnessShopRequest shopRequest
    ) {
        return ResponseEntity.ok(fitnessShopService.add(shopRequest.getUpsertFitnessShopDto(), shopRequest.getSubscriptionResponse()));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<FitnessShopDto> editFitnessShop(
            @RequestBody @NotNull @Valid UpsertFitnessShopDto fitnessShopDto,
            @PathVariable @NotNull Long id
    ) {
        return ResponseEntity.ok(fitnessShopService.edit(fitnessShopDto, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteFitnessShop(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(fitnessShopService.delete(id));
    }
}
