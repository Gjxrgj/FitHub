package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class ProfessionalTrainerDto {
    private Long id;
    private Long userId;
    private String username;
    private String phoneNumber;
    private String email;
}
