package mk.ukim.finki.fithubapi.TrackingService.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;

import java.io.IOException;

public class ExerciseCategoryDeserializer extends JsonDeserializer<ExerciseCategory> {
    @Override
    public ExerciseCategory deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String value = p.getText().toUpperCase().replace(" ", "_");
        return ExerciseCategory.valueOf(value);
    }
}
