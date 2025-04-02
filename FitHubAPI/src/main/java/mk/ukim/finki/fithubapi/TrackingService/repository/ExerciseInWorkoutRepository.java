package mk.ukim.finki.fithubapi.TrackingService.repository;

import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseInWorkoutRepository extends JpaRepository<ExerciseInWorkout, Long> {
    List<ExerciseInWorkout> findAllByIdIn(List<Long> ids);
}
