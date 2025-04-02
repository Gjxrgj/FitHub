package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.GroupTrainingDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertGroupTrainingDto;
import mk.ukim.finki.fithubapi.VenueService.model.GroupTraining;
import mk.ukim.finki.fithubapi.VenueService.model.Gym;
import mk.ukim.finki.fithubapi.VenueService.model.ProfessionalTrainer;

import java.util.ArrayList;
import java.util.List;

public class GroupTrainingMapper {

    public static GroupTrainingDto toDto(GroupTraining groupTraining) {
        return new GroupTrainingDto(
                groupTraining.getId(),
                groupTraining.getName(),
                groupTraining.getDescription(),
                groupTraining.getPrice(),
                groupTraining.getCurrency(),
                groupTraining.getProfessionalTrainer().getId(),
                groupTraining.getProfessionalTrainer().getUsername()
        );
    }

    public static GroupTraining toEntity(UpsertGroupTrainingDto upsertGroupTrainingDto, Gym gym, ProfessionalTrainer professionalTrainer) {
        return new GroupTraining(
                upsertGroupTrainingDto.getName(),
                upsertGroupTrainingDto.getDescription(),
                upsertGroupTrainingDto.getPrice(),
                upsertGroupTrainingDto.getCurrency(),
                gym,
                professionalTrainer
        );
    }

    public static List<GroupTrainingDto> toDtoList(List<GroupTraining> groupTrainings) {
        List<GroupTrainingDto> personalTrainingDtos = new ArrayList<>();
        if (groupTrainings == null) {
            return personalTrainingDtos;
        }
        for (GroupTraining groupTraining : groupTrainings) {
            personalTrainingDtos.add(toDto(groupTraining));
        }
        return personalTrainingDtos;
    }
}
