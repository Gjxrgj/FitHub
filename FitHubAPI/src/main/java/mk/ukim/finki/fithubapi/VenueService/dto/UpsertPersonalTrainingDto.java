package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
@Data
public class UpsertPersonalTrainingDto {
    private String name;
    private String description;
    private Double price;
    private Currency currency;
    private Long professionalTrainerId;
}
