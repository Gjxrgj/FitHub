package mk.ukim.finki.venueservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class UpsertFitnessShopDto {
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
    private List<String> categories;
    private List<String> brands;
}
