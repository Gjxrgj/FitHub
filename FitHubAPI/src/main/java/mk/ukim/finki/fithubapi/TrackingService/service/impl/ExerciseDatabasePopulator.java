package mk.ukim.finki.fithubapi.TrackingService.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseRepository;
import mk.ukim.finki.fithubapi.TrackingService.util.JsonLoader;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ExerciseDatabasePopulator {
    private ExerciseRepository exerciseRepository;
    private JsonLoader jsonLoader;

    public void populateDatabaseFromJson() {
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = jsonLoader.loadExercisesFromJson();

            exerciseRepository.saveAll(exercises);
            System.out.println("Database populated with exercises from JSON!");
        } else {
            System.out.println("Database is already populated.");
        }
    }
}
