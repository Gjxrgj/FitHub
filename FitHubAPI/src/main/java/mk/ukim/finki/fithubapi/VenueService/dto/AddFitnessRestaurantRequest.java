package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;

@Getter
public class AddFitnessRestaurantRequest {
    @NotNull
    private UpsertFitnessRestaurantDto upsertFitnessRestaurantDto;
    @NotNull
    private SubscriptionResponse subscriptionResponse;
}
