package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionResponse;
import mk.ukim.finki.fithubapi.VenueService.dto.FitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.dto.MenuDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertFitnessRestaurantDto;
import mk.ukim.finki.fithubapi.VenueService.dto.UpsertMealDto;
import mk.ukim.finki.fithubapi.VenueService.mapper.FitnessRestaurantMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.MealMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.MenuMapper;
import mk.ukim.finki.fithubapi.VenueService.model.FitnessRestaurant;
import mk.ukim.finki.fithubapi.VenueService.model.Meal;
import mk.ukim.finki.fithubapi.VenueService.model.Menu;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import mk.ukim.finki.fithubapi.VenueService.repository.FitnessRestaurantRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.MealRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.SubscriptionRepository;
import mk.ukim.finki.fithubapi.VenueService.service.FitnessRestaurantService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import static mk.ukim.finki.fithubapi.UserService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.Radius;
import static mk.ukim.finki.fithubapi.VenueService.util.GeoUtils.calculateBoundingBox;


@Service
@AllArgsConstructor
public class FitnessRestaurantServiceImpl implements FitnessRestaurantService {

    private final FitnessRestaurantRepository fitnessRestaurantRepository;

    private final MealRepository mealRepository;

    private final SubscriptionRepository subscriptionRepository;


    @Override
    @Transactional
    public FitnessRestaurantDto getById(Long id) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));
        Subscription subscription = subscriptionRepository.findByVenueId(id);
        FitnessRestaurantDto fitnessRestaurantDto = FitnessRestaurantMapper.toDto(fitnessRestaurant);
        fitnessRestaurantDto.setSubscriptionExpirationDate(subscription.getExpirationDate().toLocalDate());
        return fitnessRestaurantDto;
    }

    @Override
    @Transactional
    public List<FitnessRestaurantDto> getAllForUser(Long userID) {
        return FitnessRestaurantMapper.allToDto(fitnessRestaurantRepository.findAllByUserId(userID));
    }

    @Override
    @Transactional
    public List<FitnessRestaurantDto> getAllByLocation(Double latitude, Double longitude) {

        Map<String, Double> bounds = calculateBoundingBox(latitude, longitude, Radius);

        List<FitnessRestaurant> fitnessRestaurants = fitnessRestaurantRepository.findAllWithinRadius(
                latitude, longitude, Radius,
                bounds.get("minLatitude"), bounds.get("maxLatitude"),
                bounds.get("minLongitude"), bounds.get("maxLongitude")
        );

        return FitnessRestaurantMapper.allToDto(fitnessRestaurants);
    }

    @Override
    @Transactional
    public FitnessRestaurantDto add(UpsertFitnessRestaurantDto fitnessRestaurantDto, SubscriptionResponse subscriptionResponse) {
        FitnessRestaurant fitnessRestaurant = FitnessRestaurantMapper.toModel(fitnessRestaurantDto);
        fitnessRestaurant.setMenu(new Menu(new ArrayList<>(), fitnessRestaurant));

        mk.ukim.finki.fithubapi.VenueService.model.Subscription subscriptionToSave = new mk.ukim.finki.fithubapi.VenueService.model.Subscription(
                subscriptionResponse.id(),
                subscriptionResponse.customerId(),
                fitnessRestaurant
        );

        fitnessRestaurant.setSubscriptionForVenue(subscriptionToSave);

        subscriptionRepository.save(subscriptionToSave);

        return FitnessRestaurantMapper.toDto(fitnessRestaurantRepository.save(fitnessRestaurant));
    }

    @Override
    @Transactional
    public FitnessRestaurantDto edit(UpsertFitnessRestaurantDto fitnessRestaurantDto, Long id) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));

        fitnessRestaurant.setUserId(fitnessRestaurantDto.getUserId());
        fitnessRestaurant.setName(fitnessRestaurantDto.getName());
        fitnessRestaurant.setVicinity(fitnessRestaurantDto.getVicinity());
        fitnessRestaurant.setLatitude(fitnessRestaurantDto.getLatitude());
        fitnessRestaurant.setLongitude(fitnessRestaurantDto.getLongitude());
        fitnessRestaurant.setDescription(fitnessRestaurantDto.getDescription());
        fitnessRestaurant.setContactNumber(fitnessRestaurantDto.getContactNumber());
        fitnessRestaurant.setContactEmail(fitnessRestaurantDto.getContactEmail());
        fitnessRestaurant.setBusinessWebsite(fitnessRestaurantDto.getBusinessWebsite());
        fitnessRestaurant.setAvatar(fitnessRestaurantDto.getAvatar() != null ? decodeFromBase64(fitnessRestaurantDto.getAvatar()) : null);

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

    @Override
    public MenuDto addMealToMenu(Long id, UpsertMealDto upsertMealDto) {
        FitnessRestaurant fitnessRestaurant = fitnessRestaurantRepository
                .findById(id)
                .orElseThrow(() -> new NoSuchElementException("Fitness restaurant with ID " + id + " not found."));
        Menu menu = fitnessRestaurant.getMenu();
        menu.addMeal(MealMapper.toEntity(upsertMealDto, menu));
        fitnessRestaurant.setMenu(menu);
        FitnessRestaurant savedRestaurant = fitnessRestaurantRepository.save(fitnessRestaurant);
        return MenuMapper.toDto(savedRestaurant.getMenu());
    }

    @Override
    public MenuDto removeMeal(Long id) {
        Meal meal = mealRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Meal with ID " + id + " not found."));
        Menu menu = meal.getMenu();
        menu.removeMeal(meal);
        FitnessRestaurant fitnessRestaurant = menu.getFitnessRestaurant();
        fitnessRestaurant.setMenu(menu);
        FitnessRestaurant savedRestaurant = fitnessRestaurantRepository.save(fitnessRestaurant);
        mealRepository.delete(meal);
        return MenuMapper.toDto(savedRestaurant.getMenu());
    }
}
