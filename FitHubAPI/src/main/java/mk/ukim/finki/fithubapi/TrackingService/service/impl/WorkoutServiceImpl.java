package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.dto.UpsertWorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.dto.WorkoutDto;
import mk.ukim.finki.fithubapi.TrackingService.mappers.WorkoutMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Day;
import mk.ukim.finki.fithubapi.TrackingService.model.Workout;
import mk.ukim.finki.fithubapi.TrackingService.repository.WorkoutRepository;
import mk.ukim.finki.fithubapi.TrackingService.service.DayService;
import mk.ukim.finki.fithubapi.TrackingService.service.WorkoutService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {
    private final DayService dayService;
    private final WorkoutRepository workoutRepository;

    @Override
    @Transactional
    public WorkoutDto addWorkout(UpsertWorkoutDto upsertWorkoutDto, Long userId) {
        Day day = dayService.getOrCreateDay(upsertWorkoutDto.getDayDate(), userId);

        Workout savedWorkout = workoutRepository.save(WorkoutMapper.toEntity(upsertWorkoutDto, day));

        return WorkoutMapper.toDto(savedWorkout);
    }

    @Override
    public List<WorkoutDto> getWorkoutsByDateOrName(@NotNull Long userId, LocalDate date, String workoutName) {
        List<Workout> workouts;
        if(workoutName != null){
            workouts = workoutRepository.findAllByNameContainingAndDay_UserId(workoutName, userId);
        } else {
            workouts = workoutRepository.findAllByDay_DateAndDay_UserId(date, userId);
        }

        return WorkoutMapper.toDtoList(workouts);
    }
}
