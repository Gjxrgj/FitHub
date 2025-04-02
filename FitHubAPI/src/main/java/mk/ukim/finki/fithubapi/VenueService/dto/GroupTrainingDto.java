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
    private Long professionalTrainerId;
    private String professionalTrainerUsername;

    public GroupTrainingDto(Long id, String name, String description, Double price, Currency currency, Long professionalTrainerId, String professionalTrainerUsername) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.professionalTrainerId = professionalTrainerId;
        this.professionalTrainerUsername = professionalTrainerUsername;
    }
}
