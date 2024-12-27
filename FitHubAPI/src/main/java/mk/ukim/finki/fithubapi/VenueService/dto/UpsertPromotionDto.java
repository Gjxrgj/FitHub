package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

import java.time.LocalDate;
@Data
public class UpsertPromotionDto {
    @NotNull
    private Integer amountOfMonths;
    @NotNull
    private Double price;
    @NotNull
    private Currency currency;
    @NotNull
    private LocalDate validUntil;
}
