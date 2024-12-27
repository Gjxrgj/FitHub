package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerAutocompleteDto;
import mk.ukim.finki.fithubapi.VenueService.dto.ProfessionalTrainerDto;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProfessionalTrainerMapper {

    public static ProfessionalTrainerDto toDto(ProfessionalTrainer trainer) {
        if (trainer == null) {
            return null; // or throw an exception if needed
        }

        ProfessionalTrainerDto dto = new ProfessionalTrainerDto();
        dto.setId(trainer.getId());
        dto.setUserId(trainer.getUserId());
        dto.setUsername(trainer.getUsername());
        dto.setPhoneNumber(trainer.getPhoneNumber());
        dto.setEmail(trainer.getEmail());
        return dto;
    }

    public static ProfessionalTrainer toEntity(ProfessionalTrainerDto dto) {
        if (dto == null) {
            return null;
        }

        ProfessionalTrainer trainer = new ProfessionalTrainer();
        trainer.setId(dto.getId());
        trainer.setUserId(dto.getUserId());
        trainer.setUsername(dto.getUsername());
        trainer.setPhoneNumber(dto.getPhoneNumber());
        trainer.setEmail(dto.getEmail());

        return trainer;
    }

    public static List<ProfessionalTrainerDto> toDtoList(List<ProfessionalTrainer> trainers) {
        return trainers.stream()
                .map(ProfessionalTrainerMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<ProfessionalTrainerAutocompleteDto> toAutocompleteDtoList(List<ProfessionalTrainer> trainers) {
        List<ProfessionalTrainerAutocompleteDto> professionalTrainerAutocompleteDtos = new ArrayList<>();
        for (ProfessionalTrainer professionalTrainer : trainers) {
            professionalTrainerAutocompleteDtos.add(new ProfessionalTrainerAutocompleteDto(
                    professionalTrainer.getId(),
                    professionalTrainer.getUsername()
            ));
        }
        return professionalTrainerAutocompleteDtos;
    }

    public static List<ProfessionalTrainer> toEntityList(List<ProfessionalTrainerDto> dtos) {
        return dtos.stream()
                .map(ProfessionalTrainerMapper::toEntity)
                .collect(Collectors.toList());
    }
}
