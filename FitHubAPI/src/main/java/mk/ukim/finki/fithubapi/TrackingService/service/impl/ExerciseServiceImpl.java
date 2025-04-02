package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.ExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertExerciseDto;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;
import mk.ukim.finki.fithubapi.TrackingService.mappers.ExerciseMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.model.ExerciseInWorkout;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseRepository;
import mk.ukim.finki.fithubapi.TrackingService.repository.WorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.ExerciseService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;

    @Override
    public boolean isDatabaseEmpty() {
        return exerciseRepository.count() == 0;
    }

    @Override
    public List<ExerciseDto> getAllBySearchAndCategory(@NotNull final String search, final ExerciseCategory category) {
        if (category == null) {
            return ExerciseMapper.toDtoList(exerciseRepository.findAllByNameContainingIgnoreCaseAndUserIdNull(search));
        }
        return ExerciseMapper.toDtoList(exerciseRepository.findAllByCategoryAndNameContainingIgnoreCase(category, search));
    }

    @Override
    public List<ExerciseDto> getRecentExercises(Long userId) {
        List<Workout> recentWorkouts = workoutRepository.findRecentWorkouts(userId, LocalDate.now().minusWeeks(2));

        List<Exercise> exercises = new ArrayList<>();

        for (Workout workout : recentWorkouts) {
            exercises.addAll(workout.getExercises().stream().map(ExerciseInWorkout::getExercise).toList());
        }

        return ExerciseMapper.toDtoList(exercises);
    }

    @Override
    @Transactional
    public ExerciseDto createExercise(UpsertExerciseDto upsertExerciseDto) {
        Exercise exercise = ExerciseMapper.toEntity(upsertExerciseDto);

        return ExerciseMapper.toDto(exerciseRepository.save(exercise));
    }

    @Override
    public List<ExerciseDto> getAllCreatedByUser(Long userId) {
        return ExerciseMapper.toDtoList(exerciseRepository.findAllByUserId(userId));
    }
}
