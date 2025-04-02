package mk.ukim.finki.fithubapi.VenueService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProfessionalTrainerRepository extends JpaRepository<ProfessionalTrainer, Long> {
    List<ProfessionalTrainer> findAllByUsernameContainingIgnoreCase(@NotNull String query);

    Optional<ProfessionalTrainer> findByUserId(Long userId);
}
