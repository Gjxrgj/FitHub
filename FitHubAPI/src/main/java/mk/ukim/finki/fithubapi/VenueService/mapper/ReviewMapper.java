package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.ReviewDto;
import mk.ukim.finki.fithubapi.VenueService.model.Review;

import java.util.List;
import java.util.stream.Collectors;

public class ReviewMapper {

    public static ReviewDto toDto(Review review) {
        if (review == null) {
            return null;
        }
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setUserId(review.getUserId());
        dto.setUsername(review.getUsername());
        dto.setRating(review.getRating());
        dto.setDate(review.getDate());
        dto.setComment(review.getComment());
        dto.setVenueId(review.getVenue() != null ? review.getVenue().getId() : null);
        dto.setTrainerId(review.getTrainer() != null ? review.getTrainer().getId() : null);
        return dto;
    }

    public static Review toEntity(ReviewDto dto) {
        if (dto == null) {
            return null;
        }
        Review review = new Review();
        review.setId(dto.id);
        review.setUserId(dto.userId);
        review.setUsername(dto.username);
        review.setDate(dto.getDate());
        review.setRating(dto.rating);
        review.setComment(dto.comment);
        return review;
    }

    public static List<ReviewDto> toDtoList(List<Review> reviews) {
        if (reviews == null) {
            return null;
        }
        return reviews.stream()
                .map(ReviewMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<Review> toEntityList(List<ReviewDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(ReviewMapper::toEntity)
                .collect(Collectors.toList());
    }
}
