package mk.ukim.finki.fithubapi.VenueService.mapper;

import lombok.Data;

@Data
public class LightGym {
    private Long userId;
    private String name;
    private String description;
    private String vicinity;
    private Double longitude;
    private Double latitude;
}
