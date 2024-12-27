package mk.ukim.finki.fithubapi.VenueService.service;

import mk.ukim.finki.fithubapi.VenueService.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    Long removeReview(Long reviewId);

    List<ReviewDto> getAllForVenue(Long venueId);
}
