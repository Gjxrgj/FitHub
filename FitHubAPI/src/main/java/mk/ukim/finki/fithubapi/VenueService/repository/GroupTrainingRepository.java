package mk.ukim.finki.fithubapi.VenueService.repository;

import mk.ukim.finki.fithubapi.VenueService.model.GroupTraining;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupTrainingRepository extends JpaRepository<GroupTraining, Long> {
}
