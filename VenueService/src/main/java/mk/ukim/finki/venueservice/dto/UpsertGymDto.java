package mk.ukim.finki.venueservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;
import mk.ukim.finki.venueservice.model.Image;

import java.util.List;

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
    private byte[] avatar;
    @NotNull
    private Double dailyPassPrice;
    @NotNull
    private Double monthlySubscription;
    @NotNull
    private Currency currency;
}
