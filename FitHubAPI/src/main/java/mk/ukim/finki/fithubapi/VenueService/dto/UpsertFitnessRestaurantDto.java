package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpsertFitnessRestaurantDto {
    @NotNull
    private Long userId;
    @NotNull
    private String name;
    @NotNull
    private String vicinity;
    @NotNull
    private double latitude;
    @NotNull
    private double longitude;
    private String description;
    @NotNull
    private String contactNumber;
    @NotNull
    private String contactEmail;
    @NotNull
    private String businessWebsite;
    private String avatar;
}
