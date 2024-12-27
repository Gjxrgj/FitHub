package mk.ukim.finki.fithubapi.VenueService.service;

import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;

import java.util.List;

public interface ProfessionalTrainerService {
    List<ProfessionalTrainerAutocompleteDto> getAllBySearch(String query);
}
