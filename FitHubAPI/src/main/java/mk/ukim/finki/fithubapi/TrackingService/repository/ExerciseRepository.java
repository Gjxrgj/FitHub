package mk.ukim.finki.fithubapi.TrackingService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    List<Exercise> findAllByCategoryAndNameContainingIgnoreCase(ExerciseCategory category, String name);
    List<Exercise> findAllByNameContainingIgnoreCase(String name);
}
