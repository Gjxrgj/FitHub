package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;

public class UpsertReviewDto {
    @NotNull
    public Long userIdCreatedBy;
    @NotNull
    public String username;
    @NotNull
    public Double rating;
    @NotNull
    public String comment;
}
