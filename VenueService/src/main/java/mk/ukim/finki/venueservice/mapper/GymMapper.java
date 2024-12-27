package mk.ukim.finki.venueservice.mapper;

import mk.ukim.finki.venueservice.dto.GymDto;
import mk.ukim.finki.venueservice.dto.UpsertGymDto;
import mk.ukim.finki.venueservice.model.Gym;

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
        gymDto.setAvatar(gym.getAvatar());
        gymDto.setReviews(gym.getReviews());
        gymDto.setImages(gym.getImages());
        gymDto.setDailyPassPrice(gym.getDailyPassPrice());
        gymDto.setMonthlySubscription(gym.getMonthlySubscription());
        gymDto.setCurrency(gym.getCurrency());
        gymDto.setPromotions(gym.getPromotions());
        gymDto.setPersonalTrainings(gym.getPersonalTrainings());
        gymDto.setGroupTrainings(gym.getGroupTrainings());
        return gymDto;
    }

    public static Gym toModel(GymDto gymDto) {
        Gym gym = new Gym();
        gym.setId(gymDto.getId());
        gym.setUserId(gymDto.getUserId());
        gym.setName(gymDto.getName());
        gym.setVicinity(gymDto.getVicinity());
        gym.setLatitude(gymDto.getLatitude());
        gym.setLongitude(gymDto.getLongitude());
        gym.setDescription(gymDto.getDescription());
        gym.setContactNumber(gymDto.getContactNumber());
        gym.setContactEmail(gymDto.getContactEmail());
        gym.setBusinessWebsite(gymDto.getBusinessWebsite());
        gym.setAvatar(gymDto.getAvatar());
        gym.setReviews(gymDto.getReviews());
        gym.setImages(gymDto.getImages());
        gym.setDailyPassPrice(gymDto.getDailyPassPrice());
        gym.setMonthlySubscription(gymDto.getMonthlySubscription());
        gym.setCurrency(gymDto.getCurrency());
        gym.setPromotions(gymDto.getPromotions());
        gym.setPersonalTrainings(gymDto.getPersonalTrainings());
        gym.setGroupTrainings(gymDto.getGroupTrainings());
        return gym;
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
        gym.setAvatar(upsertGymDto.getAvatar());
        gym.setDailyPassPrice(upsertGymDto.getDailyPassPrice());
        gym.setMonthlySubscription(upsertGymDto.getMonthlySubscription());
        gym.setCurrency(upsertGymDto.getCurrency());
        return gym;
    }
}
