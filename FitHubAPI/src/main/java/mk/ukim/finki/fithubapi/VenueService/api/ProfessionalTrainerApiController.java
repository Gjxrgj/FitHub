package mk.ukim.finki.fithubapi.VenueService.api;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;
import mk.ukim.finki.fithubapi.VenueService.service.ProfessionalTrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/professional_trainer")
public class ProfessionalTrainerApiController {
    private final ProfessionalTrainerService professionalTrainerService;

    @GetMapping("/getByQuery")
    public ResponseEntity<List<ProfessionalTrainerAutocompleteDto>> getById(@RequestParam @NotNull String query) {
        return ResponseEntity.ok(professionalTrainerService.getAllBySearch(query));
    }
}
