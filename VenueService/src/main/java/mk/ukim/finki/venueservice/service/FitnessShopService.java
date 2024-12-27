package mk.ukim.finki.venueservice.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.FitnessShopDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessShopDto;

import java.util.List;

public interface FitnessShopService {
    FitnessShopDto getById(@NotNull Long id);

    List<FitnessShopDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);

    FitnessShopDto add(@NotNull UpsertFitnessShopDto gym);

    FitnessShopDto edit(@NotNull UpsertFitnessShopDto gym, @NotNull Long id);


    Long delete(@NotNull Long id);
}
