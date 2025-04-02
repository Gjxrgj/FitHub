package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PricingDto {
    @NotNull
    private Double dailyPass;
    @NotNull
    private Double monthlySubscription;
}
