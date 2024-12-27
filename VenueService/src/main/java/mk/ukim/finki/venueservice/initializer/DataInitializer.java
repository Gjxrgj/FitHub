package mk.ukim.finki.venueservice.initializer;

import mk.ukim.finki.venueservice.enums.Currency;
import mk.ukim.finki.venueservice.model.FitnessRestaurant;
import mk.ukim.finki.venueservice.model.FitnessShop;
import mk.ukim.finki.venueservice.model.Gym;
import mk.ukim.finki.venueservice.repository.FitnessRestaurantRepository;
import mk.ukim.finki.venueservice.repository.FitnessShopRepository;
import mk.ukim.finki.venueservice.repository.GymRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GymRepository gymRepository;
    private final FitnessRestaurantRepository fitnessRestaurantRepository;
    private final FitnessShopRepository fitnessShopRepository;

    public DataInitializer(GymRepository gymRepository, FitnessRestaurantRepository fitnessRestaurantRepository, FitnessShopRepository fitnessShopRepository) {
        this.gymRepository = gymRepository;
        this.fitnessRestaurantRepository = fitnessRestaurantRepository;
        this.fitnessShopRepository = fitnessShopRepository;
    }

    @Override
    public void run(String... args) {
        createGymIfNotExists("Fit Gym", "123 Fitness St, Fit City", 41.97594199563785, 21.44409620623024,
                "A top-notch gym with all modern amenities.", 10.0, 50.0, Currency.USD);

        createGymIfNotExists("Power Gym", "456 Strength Ave, Power Town", 41.97694199563785, 21.44509620623024,
                "Best gym for bodybuilders.", 12.0, 60.0, Currency.EUR);

        createFitnessRestaurantIfNotExists("Healthy Bites", "789 Nutrition Blvd, Wellness City", 41.97794199563785,
                21.44609620623024, "A restaurant specializing in healthy meals.", "123-456-7890", "info@healthybites.com",
                "http://healthybites.com");

        createFitnessShopIfNotExists("Fit Gear", "321 Exercise Rd, Gear Town", 41.97894199563785, 21.44709620623024,
                "Your one-stop shop for fitness gear.", "http://fitgear.com", List.of("Equipment", "Apparel"), List.of("Nike", "Adidas"));
    }

    private void createGymIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                      String description, Double dailyPassPrice, Double monthlySubscription, Currency currency) {
        Optional<Gym> existingGym = gymRepository.findByName(name);
        if (existingGym.isEmpty()) {
            Gym gym = new Gym();
            gym.setUserId(1L);
            gym.setName(name);
            gym.setVicinity(vicinity);
            gym.setLatitude(latitude);
            gym.setLongitude(longitude);
            gym.setDescription(description);
            gym.setDailyPassPrice(dailyPassPrice);
            gym.setMonthlySubscription(monthlySubscription);
            gym.setCurrency(currency);
            gymRepository.save(gym);
        }
    }

    private void createFitnessRestaurantIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                                    String description, String contactNumber, String contactEmail, String businessWebsite) {
        Optional<FitnessRestaurant> existingRestaurant = fitnessRestaurantRepository.findByName(name);
        if (existingRestaurant.isEmpty()) {
            FitnessRestaurant restaurant = new FitnessRestaurant();
            restaurant.setUserId(1L); // Assuming a default user ID; adjust as needed
            restaurant.setName(name);
            restaurant.setVicinity(vicinity);
            restaurant.setLatitude(latitude);
            restaurant.setLongitude(longitude);
            restaurant.setDescription(description);
            restaurant.setContactNumber(contactNumber);
            restaurant.setContactEmail(contactEmail);
            restaurant.setBusinessWebsite(businessWebsite);
            fitnessRestaurantRepository.save(restaurant);
        }
    }

    private void createFitnessShopIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                              String description, String webPageLink, List<String> categories, List<String> brands) {
        Optional<FitnessShop> existingShop = fitnessShopRepository.findByName(name);
        if (existingShop.isEmpty()) {
            FitnessShop shop = new FitnessShop();
            shop.setUserId(1L); // Assuming a default user ID; adjust as needed
            shop.setName(name);
            shop.setVicinity(vicinity);
            shop.setLatitude(latitude);
            shop.setLongitude(longitude);
            shop.setDescription(description);
            shop.setWebPageLink(webPageLink);
            shop.setCategories(categories);
            shop.setBrands(brands);
            fitnessShopRepository.save(shop);
        }
    }
}
