package mk.ukim.finki.fithubapi.TrackingService.util;

import mk.ukim.finki.fithubapi.TrackingService.enums.ExerciseCategory;

public class ExerciseCategoryDeserializer extends EnumNormalizerDeserializer<ExerciseCategory> {
    public ExerciseCategoryDeserializer() {
        super(ExerciseCategory.class);
    }
}
