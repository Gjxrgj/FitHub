package mk.ukim.finki.venueservice.dto;

import lombok.Data;
import mk.ukim.finki.venueservice.enums.Currency;
import mk.ukim.finki.venueservice.model.*;

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
    private byte[] avatar;
    private List<Review> reviews;
    private List<Image> images;
    private Double dailyPassPrice;
    private Double monthlySubscription;
    private Currency currency;
    private List<Promotion> promotions;
    private List<PersonalTraining> personalTrainings;
    private List<GroupTraining> groupTrainings;
}
