package mk.ukim.finki.venueservice.mapper;

import mk.ukim.finki.venueservice.dto.FitnessShopDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessShopDto;
import mk.ukim.finki.venueservice.model.FitnessShop;
import mk.ukim.finki.venueservice.model.Image;
import mk.ukim.finki.venueservice.model.Review;

import java.util.stream.Collectors;

public class FitnessShopMapper {

    public static FitnessShopDto toDto(FitnessShop fitnessShop) {
        FitnessShopDto dto = new FitnessShopDto();
        dto.setId(fitnessShop.getId());
        dto.setUserId(fitnessShop.getUserId());
        dto.setName(fitnessShop.getName());
        dto.setVicinity(fitnessShop.getVicinity());
        dto.setLatitude(fitnessShop.getLatitude());
        dto.setLongitude(fitnessShop.getLongitude());
        dto.setDescription(fitnessShop.getDescription());
        dto.setContactNumber(fitnessShop.getContactNumber());
        dto.setContactEmail(fitnessShop.getContactEmail());
        dto.setBusinessWebsite(fitnessShop.getBusinessWebsite());
        dto.setAvatar(fitnessShop.getAvatar());
        dto.setReviews(fitnessShop.getReviews());
        dto.setImages(fitnessShop.getImages());
        dto.setCategories(fitnessShop.getCategories());
        dto.setBrands(fitnessShop.getBrands());
        return dto;
    }

    public static FitnessShop toModel(UpsertFitnessShopDto dto) {
        FitnessShop fitnessShop = new FitnessShop();
        fitnessShop.setId(dto.getId());
        fitnessShop.setUserId(dto.getUserId());
        fitnessShop.setName(dto.getName());
        fitnessShop.setVicinity(dto.getVicinity());
        fitnessShop.setLatitude(dto.getLatitude());
        fitnessShop.setLongitude(dto.getLongitude());
        fitnessShop.setDescription(dto.getDescription());
        fitnessShop.setContactNumber(dto.getContactNumber());
        fitnessShop.setContactEmail(dto.getContactEmail());
        fitnessShop.setBusinessWebsite(dto.getBusinessWebsite());
        fitnessShop.setAvatar(dto.getAvatar());
        fitnessShop.setCategories(dto.getCategories());
        fitnessShop.setBrands(dto.getBrands());
        return fitnessShop;
    }

    public static FitnessShop toModel(FitnessShopDto dto) {
        FitnessShop fitnessShop = new FitnessShop();
        fitnessShop.setUserId(dto.getUserId());
        fitnessShop.setName(dto.getName());
        fitnessShop.setVicinity(dto.getVicinity());
        fitnessShop.setLatitude(dto.getLatitude());
        fitnessShop.setLongitude(dto.getLongitude());
        fitnessShop.setDescription(dto.getDescription());
        fitnessShop.setContactNumber(dto.getContactNumber());
        fitnessShop.setContactEmail(dto.getContactEmail());
        fitnessShop.setBusinessWebsite(dto.getBusinessWebsite());
        fitnessShop.setAvatar(dto.getAvatar());
        fitnessShop.setCategories(dto.getCategories());
        fitnessShop.setBrands(dto.getBrands());
        return fitnessShop;
    }
}
