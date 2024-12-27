package mk.ukim.finki.fithubapi.VenueService.repository;

import mk.ukim.finki.fithubapi.VenueService.model.PersonalTraining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalTrainingRepository extends JpaRepository<PersonalTraining, Long> {
}
