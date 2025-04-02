package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class UpsertProfessionalTrainerDto {
    private Long userId;
    private String username;
    private String phoneNumber;
    private String email;
}
