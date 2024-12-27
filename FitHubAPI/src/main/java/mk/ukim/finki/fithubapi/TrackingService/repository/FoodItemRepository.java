package mk.ukim.finki.fithubapi.TrackingService.repository;

import mk.ukim.finki.fithubapi.TrackingService.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
}
