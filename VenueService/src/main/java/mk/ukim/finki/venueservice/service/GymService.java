package mk.ukim.finki.venueservice.service;

import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.GymDto;
import mk.ukim.finki.venueservice.dto.UpsertGymDto;

import java.util.List;

public interface GymService {
    public GymDto getById(@NotNull Long id);

    List<GymDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude);
    public GymDto add(@NotNull UpsertGymDto gym);
    public GymDto edit(@NotNull UpsertGymDto gym, @NotNull Long id);


    Long delete(@NotNull Long id);
}
