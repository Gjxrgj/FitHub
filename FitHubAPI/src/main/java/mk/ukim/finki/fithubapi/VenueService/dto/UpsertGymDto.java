package mk.ukim.finki.fithubapi.VenueService.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

@Data
public class UpsertGymDto {
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
    @Email
    private String contactEmail;
    private String businessWebsite;
    private String avatar;
    @NotNull
    private Double dailyPassPrice;
    @NotNull
    private Double monthlySubscription;
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Currency currency;
}
