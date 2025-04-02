package mk.ukim.finki.fithubapi.VenueService.service;

import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertProfessionalTrainerDto;

import java.util.List;

public interface ProfessionalTrainerService {
    List<ProfessionalTrainerAutocompleteDto> getAllBySearch(String query);

    ProfessionalTrainerDto becomeProfessionalTrainer(UpsertProfessionalTrainerDto upsertProfessionalTrainerDto);

    ProfessionalTrainerDto getById(Long id);
}
