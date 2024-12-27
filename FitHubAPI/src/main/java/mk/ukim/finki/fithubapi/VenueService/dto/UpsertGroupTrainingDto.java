package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
@Data
public class UpsertGroupTrainingDto {
    private String name;
    private String description;
    private Double price;
    private Currency currency;

    public UpsertGroupTrainingDto(String name, String description, Double price, Currency currency) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
    }
}
