package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.GymDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertGymDto;
import mk.ukim.finki.fithubapi.VenueService.model.Gym;

import java.util.ArrayList;
import java.util.List;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.encodeToBase64;


public class GymMapper {

    public static GymDto toDto(Gym gym) {
        GymDto gymDto = new GymDto();
        gymDto.setId(gym.getId());
        gymDto.setUserId(gym.getUserId());
        gymDto.setName(gym.getName());
        gymDto.setVicinity(gym.getVicinity());
        gymDto.setLatitude(gym.getLatitude());
        gymDto.setLongitude(gym.getLongitude());
        gymDto.setDescription(gym.getDescription());
        gymDto.setContactNumber(gym.getContactNumber());
        gymDto.setContactEmail(gym.getContactEmail());
        gymDto.setBusinessWebsite(gym.getBusinessWebsite());
        gymDto.setAvatar(gym.getAvatar() != null ? encodeToBase64(gym.getAvatar()) : null);
        gymDto.setReviews(ReviewMapper.toDtoList(gym.getReviews()));
        gymDto.setImages(ImageMapper.toDtoList(gym.getImages()));
        gymDto.setDailyPassPrice(gym.getDailyPassPrice());
        gymDto.setMonthlySubscription(gym.getMonthlySubscription());
        gymDto.setCurrency(gym.getCurrency());
        gymDto.setPromotions(PromotionMapper.toDtoList(gym.getPromotions()));
        gymDto.setPersonalTrainings(PersonalTrainingMapper.toDtoList(gym.getPersonalTrainings()));
        gymDto.setGroupTrainings(GroupTrainingMapper.toDtoList(gym.getGroupTrainings()));
        return gymDto;
    }

    public static Gym toModel(UpsertGymDto upsertGymDto) {
        Gym gym = new Gym();
        gym.setUserId(upsertGymDto.getUserId());
        gym.setName(upsertGymDto.getName());
        gym.setVicinity(upsertGymDto.getVicinity());
        gym.setLatitude(upsertGymDto.getLatitude());
        gym.setLongitude(upsertGymDto.getLongitude());
        gym.setDescription(upsertGymDto.getDescription());
        gym.setContactNumber(upsertGymDto.getContactNumber());
        gym.setContactEmail(upsertGymDto.getContactEmail());
        gym.setBusinessWebsite(upsertGymDto.getBusinessWebsite());
        gym.setAvatar(upsertGymDto.getAvatar() != null ? decodeFromBase64(upsertGymDto.getAvatar()) : null);
        gym.setDailyPassPrice(upsertGymDto.getDailyPassPrice());
        gym.setMonthlySubscription(upsertGymDto.getMonthlySubscription());
        gym.setCurrency(upsertGymDto.getCurrency());
        return gym;
    }

    public static List<GymDto> allToDto(List<Gym> gyms) {
        List<GymDto> gymDtos = new ArrayList<>();
        for (Gym gym : gyms) {
            gymDtos.add(GymMapper.toDto(gym));
        }
        return gymDtos;
    }
}
