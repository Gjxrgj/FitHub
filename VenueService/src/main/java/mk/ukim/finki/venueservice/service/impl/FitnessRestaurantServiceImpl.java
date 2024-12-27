package mk.ukim.finki.venueservice.service.impl;

import jakarta.transaction.Transactional;
import mk.ukim.finki.venueservice.dto.FitnessRestaurantDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessRestaurantDto;
import mk.ukim.finki.venueservice.mapper.FitnessRestaurantMapper;
import mk.ukim.finki.venueservice.mapper.GymMapper;
import mk.ukim.finki.venueservice.model.FitnessRestaurant;
import mk.ukim.finki.venueservice.model.FitnessShop;
import mk.ukim.finki.venueservice.model.Gym;
import mk.ukim.finki.venueservice.repository.FitnessRestaurantRepository;
import mk.ukim.finki.venueservice.service.FitnessRestaurantService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.venueservice.util.GeoUtils.Radius;
import static mk.ukim.finki.venueservice.util.GeoUtils.calculateBoundingBox;

@Service
public class FitnessRestaurantServiceImpl implements FitnessRestaurantService {
    private final FitnessRestaurantRepository fitnessRestaurantRepository;

    public FitnessRestaurantServiceImpl(FitnessRestaurantRepository fitnessRestaurantRepository) {
        this.fitnessRestaurantRepository = fitnessRestaurantRepository;
    }

    @Override
    public FitnessRestaurantDto getById(Long id) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));
        return FitnessRestaurantMapper.toDto(fitnessRestaurant);
    }

    @Override
    public List<FitnessRestaurantDto> getAllByLocation(Double latitude, Double longitude) {

        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);


        List<FitnessRestaurant> fitnessRestaurants = fitnessRestaurantRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        List<FitnessRestaurantDto> fitnessRestaurantDtos = new ArrayList<>();
        for (FitnessRestaurant fitnessRestaurant : fitnessRestaurants) {
            fitnessRestaurantDtos.add(FitnessRestaurantMapper.toDto(fitnessRestaurant));
        }

        return fitnessRestaurantDtos;
    }

    @Override
    @Transactional
    public FitnessRestaurantDto add(UpsertFitnessRestaurantDto fitnessRestaurantDto) {
        if (fitnessRestaurantRepository.findByName(fitnessRestaurantDto.getName()).isPresent()) {
            throw new DuplicateKeyException("A fitness restaurant with the name '" + fitnessRestaurantDto.getName() + "' already exists.");
        }
        FitnessRestaurant fitnessRestaurant = FitnessRestaurantMapper.toModel(fitnessRestaurantDto);

        fitnessRestaurantRepository.save(fitnessRestaurant);

        return FitnessRestaurantMapper.toDto(fitnessRestaurant);
    }

    @Override
    @Transactional
    public FitnessRestaurantDto edit(UpsertFitnessRestaurantDto fitnessRestaurantDto, Long id) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));

        fitnessRestaurantRepository.findByName(fitnessRestaurantDto.getName())
                .ifPresent(existingFitnessRestaurant -> {
                    if (!existingFitnessRestaurant.getId().equals(id)) {
                        throw new DuplicateKeyException("A fitness restaurant with the name '" + fitnessRestaurantDto.getName() + "' already exists.");
                    }
                });

        fitnessRestaurant.setUserId(fitnessRestaurantDto.getUserId());
        fitnessRestaurant.setName(fitnessRestaurantDto.getName());
        fitnessRestaurant.setVicinity(fitnessRestaurantDto.getVicinity());
        fitnessRestaurant.setLatitude(fitnessRestaurantDto.getLatitude());
        fitnessRestaurant.setLongitude(fitnessRestaurantDto.getLongitude());
        fitnessRestaurant.setDescription(fitnessRestaurantDto.getDescription());
        fitnessRestaurant.setContactNumber(fitnessRestaurantDto.getContactNumber());
        fitnessRestaurant.setContactEmail(fitnessRestaurantDto.getContactEmail());
        fitnessRestaurant.setBusinessWebsite(fitnessRestaurantDto.getBusinessWebsite());
        fitnessRestaurant.setAvatar(fitnessRestaurantDto.getAvatar());

        fitnessRestaurantRepository.save(fitnessRestaurant);

        return FitnessRestaurantMapper.toDto(fitnessRestaurant);
    }

    @Override
    @Transactional
    public Long delete(Long id) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));
        fitnessRestaurantRepository.delete(fitnessRestaurant);
        return id;
    }
}
