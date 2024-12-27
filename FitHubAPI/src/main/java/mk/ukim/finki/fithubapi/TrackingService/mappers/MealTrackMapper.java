package mk.ukim.finki.fithubapi.TrackingService.mappers;

import mk.ukim.finki.fithubapi.TrackingService.dto.MealTrackDto;
import mk.ukim.finki.fithubapi.TrackingService.model.MealTrack;

import java.util.List;

public class MealTrackMapper {

    public static MealTrackDto toDto(MealTrack mealTrack) {
        if (mealTrack == null) {
            return null;
        }

        MealTrackDto dto = new MealTrackDto();
        dto.setId(mealTrack.getId());
        dto.setMealType(mealTrack.getMealType());
        dto.setDayDate(mealTrack.getDay().getDate());
        dto.setFoodItems(mealTrack
                .getFoodItems()
                .stream()
                .map(FoodItemMapper::toDto)
                .toList());

        return dto;
    }

    public static List<MealTrackDto> toDtoList(List<MealTrack> mealTracks) {
        return mealTracks
                .stream()
                .map(MealTrackMapper::toDto)
                .toList();
    }
}
