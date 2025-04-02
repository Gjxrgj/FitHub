package mk.ukim.finki.fithubapi.VenueService.service.impl;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import mk.ukim.finki.fithubapi.UserService.dto.SubscriptionDto;
import mk.ukim.finki.fithubapi.UserService.enums.VenueType;
import mk.ukim.finki.fithubapi.VenueService.dto.*;
import mk.ukim.finki.fithubapi.VenueService.exception.ImageNotFoundException;
import mk.ukim.finki.fithubapi.VenueService.exception.VenueNotFoundException;
import mk.ukim.finki.fithubapi.VenueService.mapper.ImageMapper;
import mk.ukim.finki.fithubapi.VenueService.mapper.ReviewMapper;
import mk.ukim.finki.fithubapi.VenueService.model.Image;
import mk.ukim.finki.fithubapi.VenueService.model.Review;
import mk.ukim.finki.fithubapi.VenueService.model.Subscription;
import mk.ukim.finki.fithubapi.VenueService.model.Venue;
import mk.ukim.finki.fithubapi.VenueService.repository.ImageRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.VenueRepository;
import mk.ukim.finki.fithubapi.VenueService.service.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;
import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.encodeToBase64;

@Service
public class VenueServiceImpl implements VenueService {

    private final FitnessShopService fitnessShopService;
    private final GymService gymService;
    private final FitnessRestaurantService fitnessRestaurantService;
    private final VenueRepository venueRepository;
    private final SubscriptionService subscriptionService;
    private final ImageRepository imageRepository;

    public VenueServiceImpl(FitnessShopService fitnessShopService, GymService gymService, FitnessRestaurantService fitnessRestaurantService, VenueRepository venueRepository, SubscriptionService subscriptionService, ImageRepository imageRepository) {
        this.fitnessShopService = fitnessShopService;
        this.gymService = gymService;
        this.fitnessRestaurantService = fitnessRestaurantService;
        this.venueRepository = venueRepository;
        this.subscriptionService = subscriptionService;
        this.imageRepository = imageRepository;
    }

    @Override
    @Transactional
    public Map<VenueType, List<Object>> getAllForUser(@NotNull Long userId) {
        Map<VenueType, List<Object>> venues = new HashMap<>();

        List<GymDto> gyms = gymService.getAllByUser(userId);
        List<FitnessShopDto> shops = fitnessShopService.getAllByUserId(userId);
        List<FitnessRestaurantDto> restaurants = fitnessRestaurantService.getAllForUser(userId);

        List<Long> venueIds = new ArrayList<>();

        gyms.forEach(gym -> {
            venueIds.add(gym.getId());
            gym.setImages(Collections.emptyList());
            gym.setReviews(Collections.emptyList());
        });

        shops.forEach(shop -> {
            venueIds.add(shop.getId());
            shop.setImages(Collections.emptyList());
            shop.setReviews(Collections.emptyList());
        });

        restaurants.forEach(restaurant -> {
            venueIds.add(restaurant.getId());
            restaurant.setImages(Collections.emptyList());
            restaurant.setReviews(Collections.emptyList());
        });

        List<SubscriptionDto> subscriptions = subscriptionService.getAllByIds(venueIds);

        Map<Long, SubscriptionDto> subscriptionMap = subscriptions.stream()
                .collect(Collectors.toMap(SubscriptionDto::getVenueId, subscription -> subscription));

        List<GymDto> gymsWithExpirationDate = gyms.stream()
                .peek(gym -> {
                    SubscriptionDto subscriptionDto = subscriptionMap.get(gym.getId());
                    if (subscriptionDto != null) {
                        gym.setSubscriptionExpirationDate(subscriptionDto.getExpirationDate().toLocalDate());
                    }
                }).toList();

        List<FitnessShopDto> shopsWithExpirationDate = shops.stream()
                .peek(shop -> {
                    SubscriptionDto subscriptionDto = subscriptionMap.get(shop.getId());
                    if (subscriptionDto != null) {
                        shop.setSubscriptionExpirationDate(subscriptionDto.getExpirationDate().toLocalDate());
                    }
                }).toList();

        List<FitnessRestaurantDto> restaurantsWithExpirationDate = restaurants.stream()
                .peek(shop -> {
                    SubscriptionDto subscriptionDto = subscriptionMap.get(shop.getId());
                    if (subscriptionDto != null) {
                        shop.setSubscriptionExpirationDate(subscriptionDto.getExpirationDate().toLocalDate());
                    }
                }).toList();


        venues.put(VenueType.GYM, Collections.singletonList(gymsWithExpirationDate));
        venues.put(VenueType.SHOP, Collections.singletonList(shopsWithExpirationDate));
        venues.put(VenueType.RESTAURANT, Collections.singletonList(restaurantsWithExpirationDate));

        return venues;
    }

    @Override
    @Transactional
    public ReviewDto addReview(UpsertReviewDto upsertReviewDto, Long venueId) {
        Venue venue = venueRepository
                .findById(venueId)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id" + venueId + "not found."));
        List<Review> currentReviews = venue.getReviews();
        Review newReview = new Review(
                upsertReviewDto.userIdCreatedBy,
                upsertReviewDto.username,
                upsertReviewDto.comment,
                upsertReviewDto.rating,
                LocalDate.now(),
                venue);
        currentReviews.add(newReview);
        venue.setReviews(currentReviews);
        venueRepository.save(venue);
        return ReviewMapper.toDto(newReview);
    }

    @Override
    @Transactional
    public List<ImageDto> addImage(Long id, UpsertImageDto imageDto) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id " + id + "not found."));
        List<Image> venueImages = venue.getImages();
        venueImages.add(ImageMapper.toEntity(imageDto, venue));
        venue.setImages(venueImages);
        Venue savedVenue = venueRepository.save(venue);
        return ImageMapper.toDtoList(savedVenue.getImages());
    }

    @Override
    @Transactional
    public List<ImageDto> removeImage(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new ImageNotFoundException("Image with id " + id + " not found"));
        Venue venue = image.getVenue();
        List<Image> venueImages = venue.getImages();
        venueImages.remove(image);
        venue.setImages(venueImages);
        Venue savedVenue = venueRepository.save(venue);
        imageRepository.delete(image);
        return ImageMapper.toDtoList(savedVenue.getImages());
    }

    @Override
    @Transactional
    public String updateAvatar(Long id, String avatar) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id " + id + "not found."));
        venue.setAvatar(decodeFromBase64(avatar));
        Venue savedVenue = venueRepository.save(venue);
        return encodeToBase64(savedVenue.getAvatar());
    }

    @Override
    @Transactional
    public String editDescription(Long id, String description) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id " + id + "not found."));
        venue.setDescription(description);
        Venue savedVenue = venueRepository.save(venue);

        return savedVenue.getDescription();
    }

    @Override
    @Transactional
    public ContactInformationDto updateContactInformation(Long id, ContactInformationDto contactInformationDto) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id " + id + "not found."));
        venue.setContactEmail(contactInformationDto.getContactEmail());
        venue.setContactNumber(contactInformationDto.getContactNumber());
        venue.setBusinessWebsite(contactInformationDto.getBusinessWebsite());
        Venue savedVenue = venueRepository.save(venue);
        ContactInformationDto savedContactInformationDto = new ContactInformationDto();
        savedContactInformationDto.setContactNumber(savedVenue.getContactNumber());
        savedContactInformationDto.setContactEmail(savedVenue.getContactEmail());
        savedContactInformationDto.setBusinessWebsite(savedVenue.getBusinessWebsite());
        return savedContactInformationDto;
    }

    @Override
    @Transactional
    public LocationDto updateLocation(Long id, LocationDto upsertLocationDto) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new VenueNotFoundException("Venue with id " + id + "not found."));
        venue.setVicinity(upsertLocationDto.getVicinity());
        venue.setLatitude(upsertLocationDto.getLatitude());
        venue.setLongitude(upsertLocationDto.getLongitude());
        Venue savedVenue = venueRepository.save(venue);
        LocationDto locationDto = new LocationDto();
        locationDto.setVicinity(savedVenue.getVicinity());
        locationDto.setLatitude(savedVenue.getLatitude());
        locationDto.setLongitude(savedVenue.getLongitude());
        return locationDto;
    }

}
