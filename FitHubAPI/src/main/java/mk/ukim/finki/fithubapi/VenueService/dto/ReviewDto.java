package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;

import java.time.LocalDate;
@Data
public class ReviewDto {
    public Long id;
    public Long userId;
    public String username;
    public Double rating;
    public String comment;
    public Long venueId;
    public Long trainerId;
    private LocalDate date;

}
