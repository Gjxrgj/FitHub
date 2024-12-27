package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

import java.util.List;

@Data
public class PersonalTrainingDto {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Currency currency;
    private ProfessionalTrainerDto professionalTrainerDto;

    public PersonalTrainingDto(Long id, String name, String description, Double price, Currency currency, ProfessionalTrainerDto professionalTrainerDto
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.currency = currency;
        this.professionalTrainerDto = professionalTrainerDto;
    }
}
