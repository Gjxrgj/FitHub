package mk.ukim.finki.fithubapi.TrackingService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealTrackRepository extends JpaRepository<MealTrack, Long> {
    List<MealTrack> findAllByDay_DateAndDay_UserId(@NotNull LocalDate dayDate, @NotNull Long userId);
    @Query("SELECT m FROM MealTrack m WHERE m.day.userId = :userId AND m.day.date BETWEEN :startDate AND CURRENT_DATE")
    List<MealTrack> findRecentMealTracks(@NotNull @Param("userId") Long userId, @Param("startDate") LocalDate startDate);
}
