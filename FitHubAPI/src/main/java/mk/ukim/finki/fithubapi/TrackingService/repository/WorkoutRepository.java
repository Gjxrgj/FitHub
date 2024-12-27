package mk.ukim.finki.fithubapi.TrackingService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    @Query("SELECT w FROM Workout w WHERE w.day.userId = :userId AND w.day.date BETWEEN :startDate AND CURRENT_DATE")
    List<Workout> findRecentWorkouts(@NotNull @Param("userId") Long userId, @Param("startDate") LocalDate startDate);
    List<Workout> findAllByNameContainingAndDay_UserId(@NotNull String name, @NotNull Long userId);
    List<Workout> findAllByDay_DateAndDay_UserId(@NotNull LocalDate date, @NotNull Long userId);
}
