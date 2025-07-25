package mk.ukim.finki.fithubapi.TrackingService.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.util.List;

@Service
public class JsonLoader {

    public List<Exercise> loadExercisesFromJson() {
        ObjectMapper objectMapper = new ObjectMapper();

        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try (InputStream inputStream = new ClassPathResource("exercises.json").getInputStream()) {
            return objectMapper.readValue(
                    inputStream,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Exercise.class)
            );
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to load JSON file from resources.");
        }
    }
}
