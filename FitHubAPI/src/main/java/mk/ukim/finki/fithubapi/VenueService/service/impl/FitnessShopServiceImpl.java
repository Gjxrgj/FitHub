package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessShopDto;
import mk.ukim.finki.fithubapi.VenueService.mapper.FitnessShopMapper;
import mk.ukim.finki.fithubapi.VenueService.model.FitnessShop;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import mk.ukim.finki.fithubapi.VenueService.repository.FitnessShopRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.SubscriptionRepository;
import mk.ukim.finki.fithubapi.VenueService.service.FitnessShopService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.Radius;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.calculateBoundingBox;


@Service
@AllArgsConstructor
public class FitnessShopServiceImpl implements FitnessShopService {

    private final FitnessShopRepository fitnessShopRepository;

    private final SubscriptionRepository subscriptionRepository;


    @Override
    public FitnessShopDto getById(@NotNull Long id) {
        FitnessShop fitnessShop = fitnessShopRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness shop with ID " + id + " not found."));
        Subscription subscription = subscriptionRepository.findByVenueId(id);
        FitnessShopDto fitnessShopDto = FitnessShopMapper.toDto(fitnessShop);
        fitnessShopDto.setSubscriptionExpirationDate(subscription.getExpirationDate().toLocalDate());
        return fitnessShopDto;
    }

    @Override
    public List<FitnessShopDto> getAllByUserId(Long userId) {
        return FitnessShopMapper.allToDto(fitnessShopRepository.findAllByUserId(userId));
    }

    @Override
    public List<FitnessShopDto> getAllByLocation(@NotNull Double latitude, @NotNull Double longitude) {
        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);

        List<FitnessShop> fitnessShops = fitnessShopRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        return FitnessShopMapper.allToDto(fitnessShops);
    }

    @Override
    @Transactional
    public FitnessShopDto add(@NotNull UpsertFitnessShopDto fitnessShopDto, @NotNull SubscriptionResponse subscriptionResponse) {
        FitnessShop fitnessShop = FitnessShopMapper.toModel(fitnessShopDto);
        mk.ukim.finki.fithubapi.VenueService.model.Subscription subscriptionToSave = new mk.ukim.finki.fithubapi.VenueService.model.Subscription(
                subscriptionResponse.id(),
                subscriptionResponse.customerId(),
                fitnessShop
        );

        fitnessShop.setSubscriptionForVenue(subscriptionToSave);

        subscriptionRepository.save(subscriptionToSave);

        return FitnessShopMapper.toDto(fitnessShopRepository.save(fitnessShop));
    }

    @Override
    @Transactional
    public FitnessShopDto edit(
            @NotNull UpsertFitnessShopDto dto,
            @NotNull Long id) {
        FitnessShop fitnessShop = fitnessShopRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness shop with ID " + id + " not found."));

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
