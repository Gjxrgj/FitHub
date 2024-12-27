package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.dto.ReviewDto;
import mk.ukim.finki.fithubapi.VenueService.exception.ReviewNotFountException;
import mk.ukim.finki.fithubapi.VenueService.mapper.ReviewMapper;
import mk.ukim.finki.fithubapi.VenueService.model.Review;
import mk.ukim.finki.fithubapi.VenueService.model.Venue;
import mk.ukim.finki.fithubapi.VenueService.repository.ReviewRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.VenueRepository;
import mk.ukim.finki.fithubapi.VenueService.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository repository;
    private final VenueRepository venueRepository;
    @Override
    @Transactional
    public Long removeReview(Long reviewId) {
        Review review = repository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFountException("Review with id " + reviewId + " not found."));

        Venue venue = review.getVenue();
        List<Review> oldReviews = venue.getReviews();
        oldReviews.remove(review);
        venue.setReviews(oldReviews);

        venueRepository.save(venue);
        repository.delete(review);

        return reviewId;
    }

    @Override
    @Transactional
    public List<ReviewDto> getAllForVenue(Long venueId) {
        return ReviewMapper.toDtoList(repository.findAllByVenueId(venueId));
    }
}
