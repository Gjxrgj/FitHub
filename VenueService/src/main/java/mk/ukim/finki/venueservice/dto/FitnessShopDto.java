package mk.ukim.finki.venueservice.dto;

import lombok.Data;
import mk.ukim.finki.venueservice.model.Image;
import mk.ukim.finki.venueservice.model.Review;

import java.util.List;
@Data
public class FitnessShopDto {
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
    private List<String> categories;
    private List<String> brands;
}
