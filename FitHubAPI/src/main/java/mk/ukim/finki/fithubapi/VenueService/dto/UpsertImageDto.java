package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpsertImageDto {
    @NotNull
    private String data;
}
