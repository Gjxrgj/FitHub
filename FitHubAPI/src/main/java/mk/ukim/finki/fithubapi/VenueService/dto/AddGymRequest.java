package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;

@Getter
public class AddGymRequest {
    @NotNull
    private UpsertGymDto upsertGymDto;
    @NotNull
    private SubscriptionResponse subscriptionResponse;
}
