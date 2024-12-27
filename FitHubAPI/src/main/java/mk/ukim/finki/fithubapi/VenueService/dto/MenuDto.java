package mk.ukim.finki.fithubapi.VenueService.dto;

import lombok.Data;
import java.util.List;

@Data
public class MenuDto {
    private Long id;
    private List<MealDto> meals;
}
