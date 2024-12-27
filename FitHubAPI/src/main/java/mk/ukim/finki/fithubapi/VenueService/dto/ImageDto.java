package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

@Data
public class ImageDto {
    private Long id;
    private Long venueId;
    private byte[] data;
}
