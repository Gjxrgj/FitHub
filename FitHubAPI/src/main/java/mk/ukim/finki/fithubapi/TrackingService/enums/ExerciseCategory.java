package mk.ukim.finki.fithubapi.TrackingService.enums;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import mk.ukim.finki.fithubapi.TrackingService.util.ExerciseCategoryDeserializer;

@JsonDeserialize(using = ExerciseCategoryDeserializer.class)
public enum ExerciseCategory {
    STRENGTH,
    STRETCHING,
    PLYOMETRICS,
    STRONGMAN,
    POWERLIFTING,
    CARDIO,
    OLYMPIC_WEIGHTLIFTING
}
