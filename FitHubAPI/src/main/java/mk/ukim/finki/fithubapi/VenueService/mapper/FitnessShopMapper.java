package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.FitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.model.FitnessShop;

import java.util.ArrayList;
import java.util.List;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.encodeToBase64;

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
        dto.setAvatar(fitnessShop.getAvatar() != null ? encodeToBase64(fitnessShop.getAvatar()) : null);
        dto.setReviews(ReviewMapper.toDtoList(fitnessShop.getReviews()));
        dto.setImages(ImageMapper.toDtoList(fitnessShop.getImages()));
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
        fitnessShop.setAvatar(dto.getAvatar() != null ? decodeFromBase64(dto.getAvatar()) : null);
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
        fitnessShop.setAvatar(dto.getAvatar() != null ? decodeFromBase64(dto.getAvatar()) : null);
        fitnessShop.setCategories(dto.getCategories());
        fitnessShop.setBrands(dto.getBrands());
        return fitnessShop;
    }

    public static List<FitnessShopDto> allToDto(List<FitnessShop> fitnessShops) {
        List<FitnessShopDto> fitnessShopDtos = new ArrayList<>();
        for (FitnessShop fitnessShop : fitnessShops) {
            fitnessShopDtos.add(FitnessShopMapper.toDto(fitnessShop));
        }
        return fitnessShopDtos;
    }
}
