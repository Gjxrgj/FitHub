package mk.ukim.finki.fithubapi.VenueService.mapper;


import mk.ukim.finki.fithubapi.VenueService.dto.FitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.model.FitnessRestaurant;

import java.util.ArrayList;
import java.util.List;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.encodeToBase64;

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
        dto.setAvatar(fitnessRestaurant.getAvatar() != null ? encodeToBase64(fitnessRestaurant.getAvatar()) : null);
        dto.setReviews(ReviewMapper.toDtoList(fitnessRestaurant.getReviews()));
        dto.setImages(ImageMapper.toDtoList(fitnessRestaurant.getImages()));
        dto.setMenu(MenuMapper.toDto(fitnessRestaurant.getMenu()));

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
        fitnessRestaurant.setAvatar(dto.getAvatar() != null ? decodeFromBase64(dto.getAvatar()) : null);

        return fitnessRestaurant;
    }

    public static List<FitnessRestaurantDto> allToDto(List<FitnessRestaurant> fitnessRestaurants) {
        List<FitnessRestaurantDto> fitnessRestaurantDtos = new ArrayList<>();
        for (FitnessRestaurant fitnessRestaurant : fitnessRestaurants) {
            fitnessRestaurantDtos.add(FitnessRestaurantMapper.toDto(fitnessRestaurant));
        }
        return fitnessRestaurantDtos;
    }
}
