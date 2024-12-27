package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.enums.VenueType;
import mk.ukim.finki.fithubapi.VenueService.dto.ContactInformationDto;
import mk.ukim.finki.fithubapi.VenueService.dto.ImageDto;
import mk.ukim.finki.fithubapi.VenueService.dto.LocationDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertImageDto;
import mk.ukim.finki.fithubapi.VenueService.service.VenueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/venue")
public class VenueApiController {
    private final VenueService venueService;

    public VenueApiController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping("/getAllForUser/{userId}")
    public ResponseEntity<Map<VenueType, List<Object>>> getAllVenuesForUserId(@PathVariable @NotNull Long userId) {
        return ResponseEntity.ok(venueService.getAllForUser(userId));
    }

    @PostMapping("/addImage/{id}")
    public ResponseEntity<List<ImageDto>> addImageToVenue(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull @Valid UpsertImageDto imageDto) {
        return ResponseEntity.ok(venueService.addImage(id, imageDto));
    }

    @DeleteMapping("/removeImage/{id}")
    public ResponseEntity<List<ImageDto>> removeImage(
            @PathVariable @NotNull Long id) {
        return ResponseEntity.ok(venueService.removeImage(id));
    }

    @PostMapping("/updateAvatar/{id}")
    public ResponseEntity<String> updateAvatar(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull String avatar) {
        return ResponseEntity.ok(venueService.updateAvatar(id, avatar));
    }

    @PostMapping("/editDescription/{id}")
    public ResponseEntity<String> editDescription(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull String description) {
        return ResponseEntity.ok(venueService.editDescription(id, description));
    }

    @PostMapping("/updateContactInformation/{id}")
    public ResponseEntity<ContactInformationDto> editDescription(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull ContactInformationDto contactInformationDto) {
        return ResponseEntity.ok(venueService.updateContactInformation(id, contactInformationDto));
    }

    @PostMapping("/updateLocation/{id}")
    public ResponseEntity<LocationDto> getAllByLocation(
            @PathVariable @NotNull Long id,
            @RequestBody @NotNull LocationDto upsertLocationDto
    ) {
        return ResponseEntity.ok(venueService.updateLocation(id, upsertLocationDto));
    }
}
