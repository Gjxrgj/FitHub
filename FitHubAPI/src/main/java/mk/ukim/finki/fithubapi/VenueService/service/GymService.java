package mk.ukim.finki.fithubapi.VenueService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.dto.*;

import java.util.List;

public interface GymService {
    public GymDto getById(@NotNull Long id);

    List<GymDto> getAllByUser(@NotNull Long userId);

    List<GymDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);

    public GymDto add(@NotNull UpsertGymDto gym);

    public GymDto edit(@NotNull UpsertGymDto gym, @NotNull Long id);


    Long delete(@NotNull Long id);

    List<PromotionDto> addPromotion(Long id, UpsertPromotionDto promotionDto);

    List<PromotionDto> removePromotion(Long id);

    List<GroupTrainingDto> addGroupTraining(Long id, UpsertGroupTrainingDto upsertGroupTrainingDto);

    List<GroupTrainingDto> removeGroupTraining(Long id);

    List<PersonalTrainingDto> removePersonalTraining(Long id);

    List<PersonalTrainingDto> addPersonalTraining(Long id, UpsertPersonalTrainingDto upsertGroupTrainingDto);

    PricingDto updatePricing(Long id, PricingDto pricingDto);
}
