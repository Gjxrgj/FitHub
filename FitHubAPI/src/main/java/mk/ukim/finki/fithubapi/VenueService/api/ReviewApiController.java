package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.dto.ReviewDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertReviewDto;
import mk.ukim.finki.fithubapi.VenueService.service.ReviewService;
import mk.ukim.finki.fithubapi.VenueService.service.VenueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/review")
public class ReviewApiController {

    private final ReviewService reviewService;
    private final VenueService venueService;


    @GetMapping("/getAllForVenue/{venueId}")
    public ResponseEntity<List<ReviewDto>> getReviewsForVenue(@PathVariable @NotNull Long venueId) {
        return ResponseEntity.ok(reviewService.getAllForVenue(venueId));
    }

    @PostMapping("/addReview/{venueId}")
    public ResponseEntity<ReviewDto> addReviewToVenue(
            @RequestBody @NotNull @Valid UpsertReviewDto upsertReviewDto,
            @PathVariable @NotNull Long venueId) {
        return ResponseEntity.ok(venueService.addReview(upsertReviewDto, venueId));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Long> removeReview(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(reviewService.removeReview(id));
    }
}
