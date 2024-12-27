package mk.ukim.finki.fithubapi.initializer;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import mk.ukim.finki.fithubapi.TrackingService.model.Exercise;
import mk.ukim.finki.fithubapi.TrackingService.repository.ExerciseRepository;
import mk.ukim.finki.fithubapi.TrackingService.util.JsonLoader;
import mk.ukim.finki.fithubapi.UserService.enums.*;
import mk.ukim.finki.fithubapi.UserService.models.*;
import mk.ukim.finki.fithubapi.UserService.repository.*;
import mk.ukim.finki.fithubapi.VenueService.enums.Currency;
import mk.ukim.finki.fithubapi.VenueService.enums.FoodCategory;
import mk.ukim.finki.fithubapi.VenueService.model.*;
import mk.ukim.finki.fithubapi.VenueService.repository.FitnessRestaurantRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.FitnessShopRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.GymRepository;
import mk.ukim.finki.fithubapi.VenueService.repository.ProfessionalTrainerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static mk.ukim.finki.fithubapi.VenueService.util.ImageUtil.decodeFromBase64;

@Component
@AllArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    private final GymRepository gymRepository;
    private final FitnessRestaurantRepository fitnessRestaurantRepository;
    private final FitnessShopRepository fitnessShopRepository;
    private final ProfessionalTrainerRepository professionalTrainerRepository;
    private final ResourceLoader resourceLoader;
    private final ExerciseRepository exerciseRepository;
    private final JsonLoader jsonLoader;
    private final PostLikeRepository postLikeRepository;
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Override
    @Transactional
    public void run(String... args) throws IOException {
        initializeRolesAndUsers();
        initializeVenues();
        populateExercisesDatabase();
    }

    private void populateExercisesDatabase() {
        if (exerciseRepository.count() == 0) {
            List<Exercise> exercises = jsonLoader.loadExercisesFromJson();
            exerciseRepository.saveAll(exercises);
            System.out.println("Database populated with exercises from JSON!");
        } else {
            System.out.println("Exercise database already populated.");
        }
    }

    private void initializeRolesAndUsers() {
        if (roleRepository.findByName(RoleName.USER).isEmpty()) {
            Role userRole = new Role(RoleName.USER);
            userRole.onCreate();
            roleRepository.save(userRole);
        }
        if (roleRepository.findByName(RoleName.ADMIN).isEmpty()) {
            Role adminRole = new Role(RoleName.ADMIN);
            adminRole.onCreate();
            roleRepository.save(adminRole);
        }

        User admin = userRepository.findByEmail("defaultAdmin@outlook.com")
                .orElseGet(() -> {
                    User newAdmin = new User();
                    newAdmin.setId(1L);
                    newAdmin.setUsername("admin");
                    newAdmin.setFirstName("Admin Name");
                    newAdmin.setLastName("Admin Surname");
                    newAdmin.setEmail("defaultAdmin@outlook.com");
                    newAdmin.setPassword(passwordEncoder.encode("Adminpassword1!"));
                    newAdmin.setActive(true);
                    newAdmin.onCreate();
                    newAdmin.setBio("Bio of default admin.");
                    return userRepository.save(newAdmin);
                });

        User user = userRepository.findByEmail("defaultUser@outlook.com")
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(2L);
                    newUser.setUsername("user");
                    newUser.setFirstName("User Name");
                    newUser.setLastName("User Surname");
                    newUser.setEmail("defaultUser@outlook.com");
                    newUser.setPassword(passwordEncoder.encode("Userpassword1!"));
                    newUser.setActive(true);
                    newUser.onCreate();
                    newUser.setBio("Bio of default user.");
                    return userRepository.save(newUser);
                });

        // Create additional users
        for (int i = 3; i <= 20; i++) {
            final int userId = i;
            userRepository.findByUsername("user" + userId).orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername("user" + userId);
                newUser.setFirstName("User " + userId);
                newUser.setLastName("Lastname " + userId);
                newUser.setEmail("user" + userId + "@example.com");
                newUser.setPassword(passwordEncoder.encode("Password" + userId + "!"));
                newUser.setActive(true);
                newUser.onCreate();
                newUser.setBio("Bio of user " + userId + ".");
                return userRepository.save(newUser);
            });
        }

        for (int i = 3; i <= 20; i++) {
            final int userId = i;
            userRepository.findByUsername("user" + userId).orElseGet(() -> {
                User newUser = new User();
                newUser.setUsername("user" + userId);
                newUser.setFirstName("User " + userId);
                newUser.setLastName("Lastname " + userId);
                newUser.setEmail("user" + userId + "@example.com");
                newUser.setPassword(passwordEncoder.encode("Password" + userId + "!"));
                newUser.setActive(true);
                newUser.onCreate();
                newUser.setBio("Bio for user " + userId);

                // Set realistic fields
                newUser.setHeight(150 + new Random().nextDouble() * 50); // Random height between 150cm and 200cm
                newUser.setWeight(50 + new Random().nextDouble() * 50); // Random weight between 50kg and 100kg
                newUser.setAge(18 + new Random().nextInt(40)); // Random age between 18 and 58
                newUser.setGender(new Random().nextBoolean() ? Gender.MALE : Gender.FEMALE); // Random gender
                newUser.setActivityLevel(ActivityLevel.values()[new Random().nextInt(ActivityLevel.values().length)]); // Random activity level
                newUser.setGoal(Goal.values()[new Random().nextInt(Goal.values().length)]); // Random goal
                newUser.setUnit(Unit.METRIC); // Assuming most users will use metric
                newUser.setDailyCalories(2000 + new Random().nextInt(500)); // Random daily calories between 2000-2500
                newUser.setAvatar(null); // Assuming no avatar for now

                // Add roles
                Role userRole = roleRepository.findByName(RoleName.USER)
                        .orElseThrow(() -> new IllegalStateException("User role not found"));
                newUser.addRole(userRole);

                return userRepository.save(newUser);
            });
        }

        List<User> allUsers = userRepository.findAll();
        for (User u : allUsers) {
            List<Long> followingIds = allUsers.stream()
                    .map(User::getId)
                    .filter(id -> !id.equals(u.getId())) // Avoid self-follow
                    .collect(Collectors.toList()); // Creates a mutable list
            u.setFollowing(followingIds);
            userRepository.save(u);
        }
        // Step 2: Set followers for each user
        for (User u : allUsers) {
            // Create a list to store the users who are following 'u'
            List<Long> followersIds = new ArrayList<>();
            for (User otherUser : allUsers) {
                if (otherUser.getFollowing().contains(u.getId())) {
                    followersIds.add(otherUser.getId());  // If otherUser follows 'u', add to followers list
                }
            }
            u.setFollowers(followersIds);
            userRepository.save(u);
        }


        Random random = new Random();
        for (User u : allUsers) {
            for (int i = 0; i < random.nextInt(5) + 1; i++) {
                Post post = new Post();
                post.setUser(u);
                post.setCreationDate(LocalDateTime.now());
                post.setTitle("Post Title " + i + " by " + u.getUsername());
                post.setDescription("This is a post description for post " + i + ".");
                post.setImage("https://via.placeholder.com/150".getBytes());
                postRepository.save(post);
                u.addPost(post);
            }
            userRepository.save(u);
        }

        List<Post> allPosts = postRepository.findAll();
        for (Post post : allPosts) {
            for (int i = 0; i < random.nextInt(3) + 1; i++) {
                Comment comment = new Comment();
                comment.setPost(post);
                comment.setUserId(allUsers.get(random.nextInt(allUsers.size())).getId());
                comment.setComment("This is a comment on post " + post.getId() + ".");
                commentRepository.save(comment);
                post.addComment(comment);
                postRepository.save(post);
            }

            Set<Long> likedUserIds = new HashSet<>();
            for (int i = 0; i < random.nextInt(10) + 1; i++) {
                Long likerId;
                do {
                    likerId = allUsers.get(random.nextInt(allUsers.size())).getId();
                } while (likedUserIds.contains(likerId));
                likedUserIds.add(likerId);

                PostLike like = new PostLike();
                like.setPost(post);
                like.setUserId(likerId);
                postLikeRepository.save(like);

                post.addLike(like);
                postRepository.save(post);
            }
        }
    }



    private void initializeVenues() throws IOException {
        createGymIfNotExists("Fit Gym", "123 Fitness St, Fit City", 41.97594199563785, 21.44409620623024,
                "A top-notch gym with all modern amenities.", 10.0, 50.0, Currency.USD);

        createGymIfNotExists("Power Gym", "456 Strength Ave, Power Town", 41.97694199563785, 21.44509620623024,
                "Best gym for bodybuilders.", 12.0, 60.0, Currency.EUR);

        createFitnessRestaurantIfNotExists("Healthy Bites", "789 Nutrition Blvd, Wellness City", 41.97794199563785,
                21.44609620623024, "A restaurant specializing in healthy meals.", "123-456-7890", "info@healthybites.com",
                "https://healthybites.com");

        createFitnessShopIfNotExists("Fit Gear", "321 Exercise Rd, Gear Town", 41.97894199563785, 21.44709620623024,
                "Your one-stop shop for fitness gear.", "+389 70 325 425", "fitgear@outlook.com", "www.fitgear.com", List.of("Equipment", "Apparel"), List.of("Nike", "Adidas"));
    }

    private void createGymIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                      String description, Double dailyPassPrice, Double monthlySubscription, Currency currency) {
        Optional<Gym> existingGym = gymRepository.findByName(name);
        if (existingGym.isEmpty()) {
            List<Image> images = new ArrayList<>();
            try {
                Resource resource = resourceLoader.getResource("classpath:static/imageUrl.txt");

                StringBuilder contentBuilder = new StringBuilder();
                try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        contentBuilder.append(line).append(System.lineSeparator());
                    }
                }


                String fileContent = contentBuilder.toString();

                Resource resource2 = resourceLoader.getResource("classpath:static/imageUrl2.txt");

                StringBuilder contentBuilder2 = new StringBuilder();
                try (BufferedReader brr = new BufferedReader(new InputStreamReader(resource2.getInputStream()))) {
                    String line;
                    while ((line = brr.readLine()) != null) {
                        contentBuilder2.append(line).append(System.lineSeparator());
                    }
                }
                String fileContent2 = contentBuilder2.toString();

                List<Promotion> promotions = new ArrayList<>();


                ProfessionalTrainer professionalTrainer1 = new ProfessionalTrainer(
                        1L,
                        "DonciMonci",
                        "+389 070 232 990",
                        "petarTrener@outlook.com",
                        new ArrayList<>(),
                        null,
                        new ArrayList<>()
                );

                List<Review> trainerReviews = new ArrayList<>();
                trainerReviews.add(new Review(
                        2L,
                        "User",
                        "Amazing trainer, take the time to explain everything calmly and gives a lot of motivation!",
                        5.0,
                        LocalDate.now().minusDays(6),
                        professionalTrainer1
                ));
                professionalTrainer1.setReviews(trainerReviews);

                List<GroupTraining> groupTrainings = new ArrayList<>();

                List<PersonalTraining> personalTrainings = new ArrayList<>();

                professionalTrainerRepository.save(professionalTrainer1);
                List<ProfessionalTrainer> professionalTrainers = new ArrayList<>();
                professionalTrainers.add(professionalTrainer1);

                Gym gym = new Gym();
                List<Review> gymReviews = new ArrayList<>();
                gymReviews.add(new Review(
                        2L,
                        "User",
                        "Great experience, the equipment is top-notch and the staff is always helpful!",
                        4.8,
                        LocalDate.now().minusDays(60),
                        gym
                ));
                gymReviews.add(new Review(
                        2L,
                        "User",
                        "Great experience, the equipment is top-notch and the staff is always helpful!",
                        4.6,
                        LocalDate.now().minusDays(2),
                        gym
                ));

                gymReviews.add(new Review(
                        2L,
                        "User",
                        "The gym is well-maintained, and the trainers are very knowledgeable. Love coming here!",
                        5.0,
                        LocalDate.now().minusDays(21),
                        gym
                ));

                gymReviews.add(new Review(
                        2L,
                        "User",
                        "Fantastic atmosphere and the group classes are intense but fun. Highly recommend!",
                        4.9,
                        LocalDate.now().minusDays(13),
                        gym
                ));
                gymReviews.add(new Review(
                        2L,
                        "User",
                        "Great experience, the equipment is top-notch and the staff is always helpful!",
                        4.6,
                        LocalDate.now().minusDays(7),
                        gym
                ));

                gymReviews.add(new Review(
                        2L,
                        "User",
                        "The gym is well-maintained, and the trainers are very knowledgeable. Love coming here!",
                        4.7,
                        LocalDate.now().minusDays(67),
                        gym
                ));

                gymReviews.add(new Review(
                        2L,
                        "User",
                        "Great experience, the equipment is top-notch and the staff is always helpful!",
                        4.6,
                        LocalDate.now().minusDays(43),
                        gym
                ));
                gymReviews.add(new Review(
                        2L,
                        "User",
                        "The gym is well-maintained, and the trainers are very knowledgeable. Love coming here!",
                        5.0,
                        LocalDate.now().minusDays(17),
                        gym
                ));
                gymReviews.add(new Review(
                        2L,
                        "User",
                        "The gym is well-maintained, and the trainers are very knowledgeable. Love coming here!",
                        5.0,
                        LocalDate.now().minusDays(11),
                        gym
                ));

                gym.setReviews(gymReviews);
                gym.setUserId(1L);
                gym.setName(name);
                gym.setVicinity(vicinity);
                gym.setLatitude(latitude);
                gym.setLongitude(longitude);
                gym.setDescription(description);
                gym.setDailyPassPrice(dailyPassPrice);
                gym.setMonthlySubscription(monthlySubscription);
                gym.setCurrency(currency);
                gym.setImages(images);
                PersonalTraining personalTraining = new PersonalTraining(
                        "Shredder",
                        "A personal training focused on cardio, condicioning and losing fat.",
                        400.0,
                        Currency.MKD,
                        gym,
                        professionalTrainer1
                );
                personalTrainings.add(
                        personalTraining
                );
                gym.setPersonalTrainings(personalTrainings);
                groupTrainings.add(
                        new GroupTraining(
                                "HIT. FAT LOSS TRAINING",
                                "Lose fat, fast with friends.",
                                1800.0,
                                Currency.MKD,
                                gym));

                gym.setGroupTrainings(groupTrainings);
                gymRepository.save(gym);

                professionalTrainer1.setGroupTrainings(groupTrainings);
                List<PersonalTraining> personalTrainingList = new ArrayList<>();
                personalTrainingList.add(personalTraining);
                professionalTrainer1.setPersonalTraining(personalTrainingList);
                professionalTrainerRepository.save(professionalTrainer1);
                images.add(new Image(decodeFromBase64(fileContent), gym));
                images.add(new Image(decodeFromBase64(fileContent2), gym));
                promotions.add(
                        new Promotion(
                                3,
                                3500.0,
                                Currency.MKD,
                                LocalDate.of(2024, 4, 1),
                                gym));
                promotions.add(
                        new Promotion(
                                6,
                                6500.0,
                                Currency.MKD,
                                LocalDate.of(2024, 4, 1),
                                gym));
                promotions.add(
                        new Promotion(
                                12,
                                1200.5, Currency.MKD,
                                LocalDate.of(2024, 4, 1),
                                gym));

                gym.setPromotions(promotions);
                gymRepository.save(gym);


            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void createFitnessRestaurantIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                                    String description, String contactNumber, String contactEmail, String businessWebsite) throws IOException {
        Optional<FitnessRestaurant> existingRestaurant = fitnessRestaurantRepository.findByName(name);

        Menu menu = new Menu(new ArrayList<>());
        List<Meal> meals = new ArrayList<>();

        Meal breakfastMeal1 = new Meal();
        List<Ingredient> breakfastIngredients1 = new ArrayList<>();
        breakfastIngredients1.add(new Ingredient("Oats", 50.0, breakfastMeal1));
        breakfastIngredients1.add(new Ingredient("Almond Milk", 200.0, breakfastMeal1));
        breakfastMeal1.setName("Oatmeal with Almond Milk");
        breakfastMeal1.setCalories(300.0);
        breakfastMeal1.setProteins(10.0);
        breakfastMeal1.setFats(5.0);
        breakfastMeal1.setCarbs(55.0);
        breakfastMeal1.setPrice(5.0);
        breakfastMeal1.setCurrency(Currency.USD);
        breakfastMeal1.setMilliliters(0.0);
        breakfastMeal1.setCategory(FoodCategory.BREAKFAST);
        breakfastMeal1.setIngredients(breakfastIngredients1);
        breakfastMeal1.setMenu(menu);
        meals.add(breakfastMeal1);

        Meal mainDishMeal1 = new Meal();
        List<Ingredient> mainDishIngredients1 = new ArrayList<>();
        mainDishIngredients1.add(new Ingredient("Salmon", 250.0, mainDishMeal1));
        mainDishIngredients1.add(new Ingredient("Quinoa", 150.0, mainDishMeal1));
        mainDishMeal1.setName("Grilled Salmon with Quinoa");
        mainDishMeal1.setCalories(450.0);
        mainDishMeal1.setProteins(35.0);
        mainDishMeal1.setFats(20.0);
        mainDishMeal1.setCarbs(40.0);
        mainDishMeal1.setPrice(20.0);
        mainDishMeal1.setCurrency(Currency.EUR);
        mainDishMeal1.setMilliliters(0.0);
        mainDishMeal1.setCategory(FoodCategory.MAIN_DISHES);
        mainDishMeal1.setIngredients(mainDishIngredients1);
        mainDishMeal1.setMenu(menu);
        meals.add(mainDishMeal1);

        Meal snackMeal1 = new Meal();
        List<Ingredient> snackIngredients1 = new ArrayList<>();
        snackIngredients1.add(new Ingredient("Greek Yogurt", 200.0, snackMeal1));
        snackIngredients1.add(new Ingredient("Honey", 10.0, snackMeal1));
        snackMeal1.setName("Greek Yogurt with Honey");
        snackMeal1.setCalories(150.0);
        snackMeal1.setProteins(12.0);
        snackMeal1.setFats(4.0);
        snackMeal1.setCarbs(18.0);
        snackMeal1.setPrice(3.0);
        snackMeal1.setCurrency(Currency.USD);
        snackMeal1.setMilliliters(0.0);
        snackMeal1.setCategory(FoodCategory.SNACK);
        snackMeal1.setIngredients(snackIngredients1);
        snackMeal1.setMenu(menu);
        meals.add(snackMeal1);

        Meal drinkMeal1 = new Meal();
        List<Ingredient> drinkIngredients1 = new ArrayList<>();
        drinkIngredients1.add(new Ingredient("Coconut Water", 250.0, drinkMeal1));
        drinkMeal1.setName("Refreshing Coconut Water");
        drinkMeal1.setCalories(50.0);
        drinkMeal1.setProteins(1.0);
        drinkMeal1.setFats(0.5);
        drinkMeal1.setCarbs(12.0);
        drinkMeal1.setPrice(2.5);
        drinkMeal1.setCurrency(Currency.USD);
        drinkMeal1.setMilliliters(250.0);
        drinkMeal1.setCategory(FoodCategory.DRINKS);
        drinkMeal1.setIngredients(drinkIngredients1);
        drinkMeal1.setMenu(menu);
        meals.add(drinkMeal1);

        menu.setMeals(meals);

        if (existingRestaurant.isEmpty()) {
            FitnessRestaurant restaurant = new FitnessRestaurant();
            menu.setFitnessRestaurant(restaurant);
            restaurant.setUserId(1L);
            restaurant.setName(name);
            restaurant.setVicinity(vicinity);
            restaurant.setLatitude(latitude);
            restaurant.setLongitude(longitude);
            restaurant.setDescription(description);
            restaurant.setContactNumber(contactNumber);
            restaurant.setContactEmail(contactEmail);
            restaurant.setBusinessWebsite(businessWebsite);
            restaurant.setMenu(menu);

            List<Image> images = new ArrayList<>();
            Resource resource = resourceLoader.getResource("classpath:static/imageUrl.txt");
            Resource resource2 = resourceLoader.getResource("classpath:static/imageUrl2.txt");
            images.add(new Image(decodeFromBase64(loadImage(resource)), restaurant));
            images.add(new Image(decodeFromBase64(loadImage(resource2)), restaurant));
            restaurant.setImages(images);

            List<Review> restaurantReviews = new ArrayList<>();
            restaurantReviews.add(new Review(
                    2L,
                    "User1",
                    "Excellent food, will definitely come back!",
                    5.0,
                    LocalDate.now().minusDays(5),
                    restaurant
            ));
            restaurantReviews.add(new Review(
                    2L,
                    "User2",
                    "Healthy options and great service.",
                    4.5,
                    LocalDate.now().minusDays(32),
                    restaurant
            ));
            restaurantReviews.add(new Review(
                    2L,
                    "User3",
                    "The ambiance is nice, and the food is delicious!",
                    4.8,
                    LocalDate.now().minusDays(35),
                    restaurant
            ));
            restaurant.setReviews(restaurantReviews);

            fitnessRestaurantRepository.save(restaurant);
        }
    }

    private String loadImage(Resource resource) throws IOException {
        StringBuilder contentBuilder = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                contentBuilder.append(line).append(System.lineSeparator());
            }
        }
        return contentBuilder.toString();
    }

    private void createFitnessShopIfNotExists(String name, String vicinity, Double latitude, Double longitude,
                                              String description, String contactNumber, String contactEmail,
                                              String businessWebsite, List<String> categories, List<String> brands) {
        Optional<FitnessShop> existingShop = fitnessShopRepository.findByName(name);
        if (existingShop.isEmpty()) {
            List<Image> images = new ArrayList<>();
            try {
                Resource resource = resourceLoader.getResource("classpath:static/imageUrl.txt");
                StringBuilder contentBuilder = new StringBuilder();
                try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        contentBuilder.append(line).append(System.lineSeparator());
                    }
                }
                String fileContent = contentBuilder.toString();

                Resource resource2 = resourceLoader.getResource("classpath:static/imageUrl2.txt");
                StringBuilder contentBuilder2 = new StringBuilder();
                try (BufferedReader brr = new BufferedReader(new InputStreamReader(resource2.getInputStream()))) {
                    String line;
                    while ((line = brr.readLine()) != null) {
                        contentBuilder2.append(line).append(System.lineSeparator());
                    }
                }
                String fileContent2 = contentBuilder2.toString();
                List<Review> shopReviews = new ArrayList<>();

                FitnessShop shop = new FitnessShop();
                shopReviews.add(new Review(
                        2L,
                        "User",
                        "Great selection of fitness gear, very helpful staff!",
                        4.7,
                        LocalDate.now().minusDays(30),
                        shop
                ));
                shopReviews.add(new Review(
                        2L,
                        "User",
                        "Good variety of equipment, and reasonable prices.",
                        4.5,
                        LocalDate.now().minusDays(10),
                        shop
                ));
                images.add(new Image(decodeFromBase64(fileContent), shop));
                images.add(new Image(decodeFromBase64(fileContent2), shop));
                shop.setUserId(1L);
                shop.setName(name);
                shop.setVicinity(vicinity);
                shop.setLatitude(latitude);
                shop.setLongitude(longitude);
                shop.setDescription(description);
                shop.setContactNumber(contactNumber);
                shop.setContactEmail(contactEmail);
                shop.setBusinessWebsite(businessWebsite);
                shop.setCategories(categories);
                shop.setBrands(brands);
                shop.setImages(images);
                shop.setReviews(shopReviews);
                fitnessShopRepository.save(shop);

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
