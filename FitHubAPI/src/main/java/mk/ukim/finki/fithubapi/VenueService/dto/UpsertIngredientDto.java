package mk.ukim.finki.fithubapi.VenueService.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpsertIngredientDto {
    @NotNull
    private String name;
    @NotNull
    private Double quantity;
}
