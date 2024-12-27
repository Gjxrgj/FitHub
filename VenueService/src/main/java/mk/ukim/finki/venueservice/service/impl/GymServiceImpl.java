package mk.ukim.finki.venueservice.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.GymDto;
import mk.ukim.finki.venueservice.dto.UpsertGymDto;
import mk.ukim.finki.venueservice.mapper.GymMapper;
import mk.ukim.finki.venueservice.model.Gym;
import mk.ukim.finki.venueservice.repository.GymRepository;
import mk.ukim.finki.venueservice.service.GymService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.venueservice.util.GeoUtils.Radius;
import static mk.ukim.finki.venueservice.util.GeoUtils.calculateBoundingBox;

@Service
public class GymServiceImpl implements GymService {
    private final GymRepository gymRepository;

    public GymServiceImpl(GymRepository gymRepository) {
        this.gymRepository = gymRepository;
    }

    public GymDto getById(@NotNull Long id) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));

        return GymMapper.toDto(gym);
    }

    @Override
    public List<GymDto> getAllByLocation(Double latitude, Double longitude) {

        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);

        List<Gym> gyms = gymRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        List<GymDto> gymDtos = new ArrayList<>();
        for (Gym gym : gyms) {
            gymDtos.add(GymMapper.toDto(gym));
        }

        return gymDtos;
    }

    @Override
    @Transactional
    public GymDto add(@NotNull UpsertGymDto dto) {
        if (gymRepository.findByName(dto.getName()).isPresent()) {
            throw new DuplicateKeyException("A gym with the name '" + dto.getName() + "' already exists.");
        }
        Gym gym = GymMapper.toModel(dto);

        gymRepository.save(gym);

        return GymMapper.toDto(gym);
    }

    @Override
    @Transactional
    public GymDto edit(@NotNull UpsertGymDto dto, @NotNull Long id) {
        Gym gym = gymRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));

        gymRepository.findByName(dto.getName())
                .ifPresent(existingFitnessRestaurant -> {
                    if (!existingFitnessRestaurant.getId().equals(id)) {
                        throw new DuplicateKeyException("A gym with the name '" + dto.getName() + "' already exists.");
                    }
                });

        gym.setUserId(dto.getUserId());
        gym.setName(dto.getName());
        gym.setVicinity(dto.getVicinity());
        gym.setLatitude(dto.getLatitude());
        gym.setLongitude(dto.getLongitude());
        gym.setDescription(dto.getDescription());
        gym.setContactNumber(dto.getContactNumber());
        gym.setContactEmail(dto.getContactEmail());
        gym.setBusinessWebsite(dto.getBusinessWebsite());
        gym.setAvatar(dto.getAvatar());
        gym.setDailyPassPrice(dto.getDailyPassPrice());
        gym.setMonthlySubscription(dto.getMonthlySubscription());
        gym.setCurrency(dto.getCurrency());

        Gym savedGym = gymRepository.save(gym);
        return GymMapper.toDto(savedGym);
    }

    @Override
    @Transactional
    public Long delete(@NotNull Long id) {
        Gym gym = gymRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Gym with ID " + id + " not found."));
        gymRepository.delete(gym);
        return id;
    }

}
