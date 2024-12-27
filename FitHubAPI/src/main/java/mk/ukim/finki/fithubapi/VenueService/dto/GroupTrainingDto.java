package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

@Data
public class GroupTrainingDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Currency currency;

    public GroupTrainingDto(Long id, String name, String description, Double price, Currency currency) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
    }
}
