package mk.ukim.finki.fithubapi.VenueService.repository;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long> {
}
