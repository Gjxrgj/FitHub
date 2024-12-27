package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import mk.ukim.finki.fithubapi.VenueService.model.Image;
import mk.ukim.finki.fithubapi.VenueService.model.Menu;
import mk.ukim.finki.fithubapi.VenueService.model.Review;
import java.util.List;

@Data
public class FitnessRestaurantDto {
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
    private MenuDto menu;
}
