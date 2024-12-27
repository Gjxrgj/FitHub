package mk.ukim.finki.fithubapi.VenueService.repository;

import mk.ukim.finki.fithubapi.VenueService.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByVenueId(Long venueId);
}
