package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;
import mk.ukim.finki.fithubapi.VenueService.mapper.ProfessionalTrainerMapper;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;
import mk.ukim.finki.fithubapi.VenueService.repository.ProfessionalTrainerRepository;
import mk.ukim.finki.fithubapi.VenueService.service.ProfessionalTrainerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProfessionalTrainerServiceImpl implements ProfessionalTrainerService {

    private final ProfessionalTrainerRepository professionalTrainerRepository;

    @Override
    public List<ProfessionalTrainerAutocompleteDto> getAllBySearch(@NotNull String query) {
        List<ProfessionalTrainer> professionalTrainers = professionalTrainerRepository
                .findAllByUsernameContainingIgnoreCase(query);
        return ProfessionalTrainerMapper.toAutocompleteDtoList(professionalTrainers);
    }
}
