package mk.ukim.finki.fithubapi.VenueService.mapper;

import mk.ukim.finki.fithubapi.VenueService.dto.PromotionDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertPromotionDto;
import mk.ukim.finki.fithubapi.VenueService.model.Gym;
import mk.ukim.finki.fithubapi.VenueService.model.Promotion;

import java.util.ArrayList;
import java.util.List;

public class PromotionMapper {
    public static PromotionDto toDto(Promotion promotion) {
        return new PromotionDto(
                promotion.getId(),
                promotion.getAmountOfMonths(),
                promotion.getPrice(),
                promotion.getCurrency(),
                promotion.getValidUntil()
        );
    }

    public static List<PromotionDto> toDtoList(List<Promotion> promotions) {
        List<PromotionDto> promotionDtos = new ArrayList<>();
        if (promotions == null) {
            return promotionDtos;
        }
        for (Promotion promotion : promotions) {
            promotionDtos.add(toDto(promotion));
        }
        return promotionDtos;
    }

    public static Promotion toEntity(UpsertPromotionDto promotionDto, Gym gym) {
        return new Promotion(
                promotionDto.getAmountOfMonths(),
                promotionDto.getPrice(),
                promotionDto.getCurrency(),
                promotionDto.getValidUntil(),
                gym
        );
    }
}
