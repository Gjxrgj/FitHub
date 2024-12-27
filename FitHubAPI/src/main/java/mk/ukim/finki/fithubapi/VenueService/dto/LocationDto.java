package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class LocationDto {
    private String vicinity;
    private Double latitude;
    private Double longitude;

    public LocationDto(String vicinity, Double latitude, Double longitude) {
        this.vicinity = vicinity;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
