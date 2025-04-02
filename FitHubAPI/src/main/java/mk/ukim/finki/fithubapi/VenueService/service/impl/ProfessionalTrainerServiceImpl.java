package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.exceptions.UserNotFoundException;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertProfessionalTrainerDto;
import mk.ukim.finki.fithubapi.VenueService.mapper.ProfessionalTrainerMapper;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;
import mk.ukim.finki.fithubapi.VenueService.repository.ProfessionalTrainerRepository;
import mk.ukim.finki.fithubapi.VenueService.service.ProfessionalTrainerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    @Transactional
    public ProfessionalTrainerDto becomeProfessionalTrainer(UpsertProfessionalTrainerDto upsertProfessionalTrainerDto) {
        Optional<ProfessionalTrainer> professionalTrainer = professionalTrainerRepository.findByUserId(upsertProfessionalTrainerDto.getUserId());
        if (professionalTrainer.isPresent()) {
            ProfessionalTrainer trainerToEdit = professionalTrainer.get();
            trainerToEdit.setUsername(upsertProfessionalTrainerDto.getUsername());
            trainerToEdit.setEmail(upsertProfessionalTrainerDto.getEmail());
            trainerToEdit.setPhoneNumber(upsertProfessionalTrainerDto.getPhoneNumber());
            ProfessionalTrainer savedTrainer = professionalTrainerRepository.save(trainerToEdit);
            return ProfessionalTrainerMapper.toDto(savedTrainer);
        } else {
            ProfessionalTrainer trainer = ProfessionalTrainerMapper.toEntity(upsertProfessionalTrainerDto);
            ProfessionalTrainer savedTrainer = professionalTrainerRepository.save(trainer);
            return ProfessionalTrainerMapper.toDto(savedTrainer);
        }
    }

    @Override
    public ProfessionalTrainerDto getById(Long id) {
        return ProfessionalTrainerMapper.toDto(professionalTrainerRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Professional trainer not found with id: " + id)));
    }
}
