package mk.ukim.finki.fithubapi.VenueService.repository;

import mk.ukim.finki.fithubapi.VenueService.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ImageRepository extends JpaRepository<Image, Long> {
}
