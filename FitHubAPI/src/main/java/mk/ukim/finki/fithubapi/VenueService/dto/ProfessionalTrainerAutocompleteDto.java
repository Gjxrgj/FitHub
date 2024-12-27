package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class ProfessionalTrainerAutocompleteDto {
    private Long professionalTrainerId;
    private String username;

    public ProfessionalTrainerAutocompleteDto(Long professionalTrainerId, String username) {
        this.professionalTrainerId = professionalTrainerId;
        this.username = username;
    }
}
