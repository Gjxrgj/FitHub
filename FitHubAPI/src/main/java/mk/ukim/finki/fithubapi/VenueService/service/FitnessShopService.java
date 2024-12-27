package mk.ukim.finki.fithubapi.VenueService.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessShopDto;

import java.util.List;

public interface FitnessShopService {
    FitnessShopDto getById(@NotNull Long id);

    List<FitnessShopDto> getAllByUserId(@NotNull Long userId);

    List<FitnessShopDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);

    FitnessShopDto add(@NotNull UpsertFitnessShopDto gym);

    FitnessShopDto edit(@NotNull UpsertFitnessShopDto gym, @NotNull Long id);


    Long delete(@NotNull Long id);
}
