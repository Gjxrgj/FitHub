package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class GymDto {
    private Long id;
    private Long userId;
    private String name;
    private String vicinity;
    private double latitude;
    private double longitude;
    private String description;
    private String contactNumber;
    private String contactEmail;
    private String businessWebsite;
    private String avatar;
    private List<ReviewDto> reviews;
    private List<ImageDto> images;
    private Double dailyPassPrice;
    private Double monthlySubscription;
    private Currency currency;
    private List<PromotionDto> promotions;
    private List<PersonalTrainingDto> personalTrainings;
    private List<GroupTrainingDto> groupTrainings;
    @Nullable
    private LocalDate subscriptionExpirationDate;
}
