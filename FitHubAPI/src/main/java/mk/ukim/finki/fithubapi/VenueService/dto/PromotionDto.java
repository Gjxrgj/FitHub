package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

import java.time.LocalDate;

@Data
public class PromotionDto {
    private Long id;
    private Integer amountOfMonths;
    private Double price;
    private Currency currency;
    private LocalDate validUntil;

    public PromotionDto(Long id, Integer amountOfMonths, Double price, Currency currency, LocalDate validUntil) {
        this.id = id;
        this.amountOfMonths = amountOfMonths;
        this.price = price;
        this.currency = currency;
        this.validUntil = validUntil;
    }
}
