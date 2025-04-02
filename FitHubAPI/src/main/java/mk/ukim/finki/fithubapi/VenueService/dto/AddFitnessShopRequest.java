package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;

@Getter
public class AddFitnessShopRequest {
    @NotNull
    private UpsertFitnessShopDto upsertFitnessShopDto;
    @NotNull
    private SubscriptionResponse subscriptionResponse;
}
