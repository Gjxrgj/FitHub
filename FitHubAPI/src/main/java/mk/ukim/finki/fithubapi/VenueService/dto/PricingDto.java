package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PricingDto {
    @NotNull
    private Double dailyPass;
    @NotNull
    private Double monthlySubscription;

    public PricingDto(Double dailyPass, Double monthlySubscription) {
        this.dailyPass = dailyPass;
        this.monthlySubscription = monthlySubscription;
    }
}
