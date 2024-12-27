package mk.ukim.finki.fithubapi.VenueService.repository;

import mk.ukim.finki.fithubapi.VenueService.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
}
