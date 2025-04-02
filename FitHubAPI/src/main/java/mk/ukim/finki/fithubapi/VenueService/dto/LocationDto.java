package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class LocationDto {
    private String vicinity;
    private Double latitude;
    private Double longitude;
}
