package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionRequest;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.*;
import mk.ukim.finki.fithubapi.VenueService.service.GymService;
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
        List<GymDto> gyms = gymService.getAllByLocation(latitude, longitude);
        return ResponseEntity.ok(gyms);
    }

    @PostMapping("/add")
    public ResponseEntity<GymDto> addGym(
            @RequestBody @NotNull @Valid AddGymRequest gymRequest
    ) {
        return ResponseEntity.ok(gymService.add(gymRequest.getUpsertGymDto(), gymRequest.getSubscriptionResponse()));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<GymDto> editGym(
            @RequestBody @NotNull @Valid UpsertGymDto gym,
            @PathVariable @NotNull Long id
    ) {
        return ResponseEntity.ok(gymService.edit(gym, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> deleteGym(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.delete(id));
    }

    @PostMapping("/addPromotion/{id}")
    public ResponseEntity<List<PromotionDto>> addPromotion(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull @Valid UpsertPromotionDto promotionDto) {
        return ResponseEntity.ok(gymService.addPromotion(id, promotionDto));
    }

    @DeleteMapping("/removePromotion/{id}")
    public ResponseEntity<List<PromotionDto>> removePromotion(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.removePromotion(id));
    }

    @PostMapping("/addGroupTraining/{id}")
    public ResponseEntity<List<GroupTrainingDto>> addGroupTraining(
            @PathVariable @NotNull Long id,
            @RequestBody @Valid @NotNull UpsertGroupTrainingDto upsertGroupTrainingDto
    ) {
        return ResponseEntity.ok(gymService.addGroupTraining(id, upsertGroupTrainingDto));
    }

    @DeleteMapping("/removeGroupTraining/{id}")
    public ResponseEntity<List<GroupTrainingDto>> removeGroupTraining(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.removeGroupTraining(id));
    }

    @PostMapping("/addPersonalTraining/{id}")
    public ResponseEntity<List<PersonalTrainingDto>> addGroupTraining(
            @PathVariable @NotNull Long id,
            @RequestBody @Valid @NotNull UpsertPersonalTrainingDto upsertGroupTrainingDto
    ) {
        return ResponseEntity.ok(gymService.addPersonalTraining(id, upsertGroupTrainingDto));
    }

    @DeleteMapping("/removePersonalTraining/{id}")
    public ResponseEntity<List<PersonalTrainingDto>> removePersonalTraining(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(gymService.removePersonalTraining(id));
    }

    @PostMapping("/updatePricing/{id}")
    public ResponseEntity<PricingDto> updatePricing(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull PricingDto pricingDto
    ) {
        return ResponseEntity.ok(gymService.updatePricing(id, pricingDto));
    }
}
