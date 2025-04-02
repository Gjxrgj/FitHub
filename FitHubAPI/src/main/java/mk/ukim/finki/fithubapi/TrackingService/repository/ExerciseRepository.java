package mk.ukim.finki.fithubapi.TrackingService.repository;

import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findAllByCategoryAndNameContainingIgnoreCase(ExerciseCategory category, String name);
    List<Exercise> findAllByNameContainingIgnoreCaseAndUserIdNull(String name);
    List<Exercise> findAllByIdIn(List<Long> ids);
    List<Exercise> findAllByUserId(Long id);
}
