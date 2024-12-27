package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.PersonalTrainingDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertPersonalTrainingDto;
import mk.ukim.finki.fithubapi.VenueService.model.Gym;
import mk.ukim.finki.fithubapi.VenueService.model.PersonalTraining;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;

import java.util.ArrayList;
import java.util.List;

public class PersonalTrainingMapper {
    public static PersonalTrainingDto toDto(PersonalTraining personalTraining) {
        return new PersonalTrainingDto(
                personalTraining.getId(),
                personalTraining.getName(),
                personalTraining.getDescription(),
                personalTraining.getPrice(),
                personalTraining.getCurrency(),
                ProfessionalTrainerMapper.toDto(personalTraining.getProfessionalTrainer())
        );
    }

    public static PersonalTraining toEntity(UpsertPersonalTrainingDto personalTrainingDto, Gym gym, ProfessionalTrainer professionalTrainer) {
        return new PersonalTraining(
                personalTrainingDto.getName(),
                personalTrainingDto.getDescription(),
                personalTrainingDto.getPrice(),
                personalTrainingDto.getCurrency(),
                gym,
                professionalTrainer
        );
    }

    public static List<PersonalTrainingDto> toDtoList(List<PersonalTraining> personalTrainings) {
        List<PersonalTrainingDto> personalTrainingDtos = new ArrayList<>();
        for (PersonalTraining personalTraining : personalTrainings) {
            personalTrainingDtos.add(toDto(personalTraining));
        }
        return personalTrainingDtos;
    }
}
