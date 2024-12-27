package mk.ukim.finki.venueservice.mapper;

import mk.ukim.finki.venueservice.dto.FitnessRestaurantDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessRestaurantDto;
import mk.ukim.finki.venueservice.model.FitnessRestaurant;

public class FitnessRestaurantMapper {

    public static FitnessRestaurantDto toDto(FitnessRestaurant fitnessRestaurant) {
        if (fitnessRestaurant == null) {
            return null;
        }

        FitnessRestaurantDto dto = new FitnessRestaurantDto();
        dto.setId(fitnessRestaurant.getId());
        dto.setUserId(fitnessRestaurant.getUserId());
        dto.setName(fitnessRestaurant.getName());
        dto.setVicinity(fitnessRestaurant.getVicinity());
        dto.setLatitude(fitnessRestaurant.getLatitude());
        dto.setLongitude(fitnessRestaurant.getLongitude());
        dto.setDescription(fitnessRestaurant.getDescription());
        dto.setContactNumber(fitnessRestaurant.getContactNumber());
        dto.setContactEmail(fitnessRestaurant.getContactEmail());
        dto.setBusinessWebsite(fitnessRestaurant.getBusinessWebsite());
        dto.setAvatar(fitnessRestaurant.getAvatar());
        dto.setReviews(fitnessRestaurant.getReviews());
        dto.setImages(fitnessRestaurant.getImages());
        dto.setMenu(fitnessRestaurant.getMenu());

        return dto;
    }

    public static FitnessRestaurant toModel(UpsertFitnessRestaurantDto dto) {
        if (dto == null) {
            return null;
        }

        FitnessRestaurant fitnessRestaurant = new FitnessRestaurant();
        fitnessRestaurant.setUserId(dto.getUserId());
        fitnessRestaurant.setName(dto.getName());
        fitnessRestaurant.setVicinity(dto.getVicinity());
        fitnessRestaurant.setLatitude(dto.getLatitude());
        fitnessRestaurant.setLongitude(dto.getLongitude());
        fitnessRestaurant.setDescription(dto.getDescription());
        fitnessRestaurant.setContactNumber(dto.getContactNumber());
        fitnessRestaurant.setContactEmail(dto.getContactEmail());
        fitnessRestaurant.setBusinessWebsite(dto.getBusinessWebsite());
        fitnessRestaurant.setAvatar(dto.getAvatar());

        return fitnessRestaurant;
    }

    public static FitnessRestaurant toModel(FitnessRestaurantDto dto) {
        if (dto == null) {
            return null;
        }

        FitnessRestaurant fitnessRestaurant = new FitnessRestaurant();
        fitnessRestaurant.setId(dto.getId());
        fitnessRestaurant.setUserId(dto.getUserId());
        fitnessRestaurant.setName(dto.getName());
        fitnessRestaurant.setVicinity(dto.getVicinity());
        fitnessRestaurant.setLatitude(dto.getLatitude());
        fitnessRestaurant.setLongitude(dto.getLongitude());
        fitnessRestaurant.setDescription(dto.getDescription());
        fitnessRestaurant.setContactNumber(dto.getContactNumber());
        fitnessRestaurant.setContactEmail(dto.getContactEmail());
        fitnessRestaurant.setBusinessWebsite(dto.getBusinessWebsite());
        fitnessRestaurant.setAvatar(dto.getAvatar());
        fitnessRestaurant.setReviews(dto.getReviews());
        fitnessRestaurant.setImages(dto.getImages());
        fitnessRestaurant.setMenu(dto.getMenu());

        return fitnessRestaurant;
    }
}
