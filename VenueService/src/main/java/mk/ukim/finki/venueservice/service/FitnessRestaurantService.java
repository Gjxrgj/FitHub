package mk.ukim.finki.venueservice.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.FitnessRestaurantDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessRestaurantDto;

import java.util.List;

public interface FitnessRestaurantService {
    FitnessRestaurantDto getById(@NotNull Long id);

    List<FitnessRestaurantDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);

    FitnessRestaurantDto add(@NotNull UpsertFitnessRestaurantDto fitnessRestaurantDto);

    FitnessRestaurantDto edit(@NotNull UpsertFitnessRestaurantDto fitnessRestaurantDto, @NotNull Long id);

    Long delete(@NotNull Long id);
}
