package mk.ukim.finki.fithubapi.TrackingService.repository;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DayRepository extends JpaRepository<Day, Long> {
    Optional<Day> findByDateAndUserId(@NotNull  LocalDate date,@NotNull Long userId);
    Optional<Day> findDayByDate(@NotNull  LocalDate date);
}
