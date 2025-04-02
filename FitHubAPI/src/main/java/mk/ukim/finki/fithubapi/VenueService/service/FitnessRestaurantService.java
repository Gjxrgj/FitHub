package mk.ukim.finki.fithubapi.VenueService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionRequest;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.*;

import java.util.List;

public interface FitnessRestaurantService {
    FitnessRestaurantDto getById(@NotNull Long id);

    List<FitnessRestaurantDto> getAllForUser(@NotNull Long userID);

    List<FitnessRestaurantDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);

    FitnessRestaurantDto add(@NotNull UpsertFitnessRestaurantDto fitnessRestaurantDto, SubscriptionResponse subscriptionResponse);

    FitnessRestaurantDto edit(@NotNull UpsertFitnessRestaurantDto fitnessRestaurantDto, @NotNull Long id);

    Long delete(@NotNull Long id);

    MenuDto addMealToMenu(Long id, UpsertMealDto upsertMealDto);

    MenuDto removeMeal(Long id);
}
