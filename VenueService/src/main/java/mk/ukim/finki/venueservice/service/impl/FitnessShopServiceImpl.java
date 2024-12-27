package mk.ukim.finki.venueservice.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.venueservice.dto.FitnessShopDto;
import mk.ukim.finki.venueservice.dto.UpsertFitnessShopDto;
import mk.ukim.finki.venueservice.mapper.FitnessShopMapper;
import mk.ukim.finki.venueservice.model.FitnessShop;
import mk.ukim.finki.venueservice.repository.FitnessShopRepository;
import mk.ukim.finki.venueservice.service.FitnessShopService;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.venueservice.util.GeoUtils.Radius;
import static mk.ukim.finki.venueservice.util.GeoUtils.calculateBoundingBox;

@Service
public class FitnessShopServiceImpl implements FitnessShopService {

    private final FitnessShopRepository fitnessShopRepository;

    public FitnessShopServiceImpl(FitnessShopRepository fitnessShopRepository) {
        this.fitnessShopRepository = fitnessShopRepository;
    }

    @Override
    public FitnessShopDto getById(@NotNull Long id) {
        FitnessShop fitnessShop = fitnessShopRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness shop with ID " + id + " not found."));
        return FitnessShopMapper.toDto(fitnessShop);
    }

    @Override
    public List<FitnessShopDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude) {
        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);

        List<FitnessShop> fitnessShops = fitnessShopRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        List<FitnessShopDto> fitnessShopDtos = new ArrayList<>();
        for (FitnessShop fitnessShop : fitnessShops) {
            fitnessShopDtos.add(FitnessShopMapper.toDto(fitnessShop));
        }

        return fitnessShopDtos;
    }

    @Override
    @Transactional
    public FitnessShopDto add(@NotNull UpsertFitnessShopDto fitnessShopDto) {
        if (fitnessShopRepository.findByName(fitnessShopDto.getName()).isPresent()) {
            throw new DuplicateKeyException("A fitness shop with the name '" + fitnessShopDto.getName() + "' already exists.");
        }
        FitnessShop fitnessShop = FitnessShopMapper.toModel(fitnessShopDto);

        fitnessShopRepository.save(fitnessShop);

        return FitnessShopMapper.toDto(fitnessShop);
    }

    @Override
    @Transactional
    public FitnessShopDto edit(
            @NotNull UpsertFitnessShopDto dto,
            @NotNull Long id) {
        FitnessShop fitnessShop = fitnessShopRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness shop with ID " + id + " not found."));

        fitnessShopRepository.findByName(dto.getName())
                .ifPresent(existingFitnessShop -> {
                    if (!existingFitnessShop.getId().equals(id)) {
                        throw new DuplicateKeyException("A fitness shop with the name '" + dto.getName() + "' already exists.");
                    }
                });

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

        FitnessShop savedFitnessShop = fitnessShopRepository.save(fitnessShop);

        return FitnessShopMapper.toDto(savedFitnessShop);
    }


    @Override
    @Transactional
    public Long delete(@NotNull Long id) {
        FitnessShop fitnessShop = fitnessShopRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness shop with ID " + id + " not found."));
        fitnessShopRepository.delete(fitnessShop);
        return id;
    }
}
