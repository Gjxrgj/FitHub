import {
    ActivityLevel,
    CopyOrEditWorkout,
    Currency,
    ExerciseCategory,
    ExerciseLevel,
    FoodCategory,
    Force,
    Gender,
    Goal,
    MealType,
    Mechanic,
    Unit,
    VenueType
} from '../enums/enums.ts';
import moment from "moment";

export interface LoginRequest {
    username: string,
    password: string,
}

export interface UserDto {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    height: number;
    weight: number;
    birthDate: string;
    goal: Goal
    activityLevel: ActivityLevel;
    professionalTrainerId?: number;
    units: Unit;
    gender: Gender;
    avatar?: string;
    bio?: string;
    oauth2Id?: string;
    dailyCalories: number;
    numFollowers: number;
    numFollowing: number;
    numPosts: number;
}

export interface UpsertUserDto {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    avatar?: string;
    bio: string;
    weight: number;
    height: number;
    birthDate: string;
    units: Unit;
    gender: Gender;
    goal: Goal;
    activityLevel: ActivityLevel;
}

export interface UpdatePersonalInfoDto {
    firstName: string;
    lastName: string;
    weight: number;
    height: number;
    birthDate: string;
    goal: Goal;
    activityLevel: ActivityLevel;
}

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Home: undefined;
    Map: undefined;
    Profile: { userId?: number };
    CopyMeal: { foodItems: Array<FoodItemDto> };
    MyVenues: undefined;
    MapScreen: undefined;
    ReviewModal: undefined;
    BarcodeScanner: undefined;
    SearchFriends: undefined;
    SearchMealScreen: undefined;
    SearchExerciseScreen: undefined;
    CalorieOverview: undefined;
    EditPersonalInfoScreen: undefined;
    SubscriptionScreen: undefined;
    MealStatsModal: undefined;
    MyFoodItems: undefined;
    CreateNewFoodItem: undefined;
    MyExercises: undefined;
    CopyEditWorkout: { workout: WorkoutDto, copyEditWorkout: CopyOrEditWorkout };
    BecomeProfessionalTrainer: { professionalTrainer?: ProfessionalTrainerDto };
    PostMeal: { mealId: number }
    PostWorkout: { workoutId: number };
    Resubscribe: { venue: GymDto | FitnessShopDto | FitnessRestaurantDto, venueType: VenueType }
    CommentsScreen: { comments: Array<CommentDto> };
    AddExerciseToWorkoutScreen: { exerciseDto: ExerciseDto, postId: number }
    AddEditPostScreen: { postDto?: PostDto, upsertPostDto?: UpsertPostDto }
    DayMealsScreen: { meals?: Array<MealTrackDto>, upsertPostDto?: UpsertPostDto };
    DayWorkoutsScreen: { upsertPostDto?: UpsertPostDto, dayDate?: moment.Moment };
    AddVenue: { venueType: VenueType };
    GymScreen: { gymId: number };
    FitnessShopScreen: { shopId: number };
    FitnessRestaurantScreen: { restaurantId: number };
    MenuScreen: { menu: MenuDto, restaurantName: string, ownerId: number, fitnessRestaurantId: number };
    AddMealScreen: { fitnessRestaurantId: number, foodCategory: FoodCategory };
    MealScreen: { foodItem: OFFFoodItemDto | USDAFoodItem | FoodItemDto };
    BottomNavigation: undefined;
    SignUpStep1: undefined;
    SignUpStep2: { userDto: UpsertUserDto };
    SignUpStep3: { userDto: UpsertUserDto };
};

export interface FitnessRestaurantDto {
    id: number;
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber?: string;
    contactEmail?: string;
    businessWebsite?: string;
    avatar?: string;
    images: Array<ImageDto>;
    menu: MenuDto;
    subscriptionExpirationDate: string;
}

export interface ImageDto {
    id: number,
    data: string,
    venueId: number
}

export interface UpsertImageDto {
    data: string,
}

export interface ReviewDto {
    id: number,
    userId: number,
    username: string,
    comment: string,
    rating: number,
    date: string,
    trainerId?: number,
    venueId?: number,
}

export interface UpsertReviewDto {
    userIdCreatedBy: number,
    username: string,
    comment: string,
    rating: number,
}

export interface MenuDto {
    id: number,
    meals: Array<MealDto>,
}

export interface MealDto {
    id: number,
    name: string,
    calories: number,
    proteins: number,
    fats: number,
    carbs: number,
    price: number,
    currency: Currency,
    milliliters: number,
    category: FoodCategory,
    ingredients: Array<IngredientDto>
}

export interface IngredientDto {
    id: number,
    name: string,
    quantity: number
}

export interface FitnessShopDto {
    id: number;
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber?: string;
    contactEmail?: string;
    businessWebsite?: string;
    avatar?: string;
    reviews: ReviewDto[];
    images: ImageDto[];
    categories: string[];
    brands: string[];
    subscriptionExpirationDate: string;
}

export interface GymDto {
    id: number;
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber?: string;
    contactEmail?: string;
    businessWebsite?: string;
    avatar?: string;
    images: ImageDto[];
    dailyPassPrice?: number;
    monthlySubscription?: number;
    currency: Currency;
    promotions: PromotionDto[];
    personalTrainings: PersonalTrainingDto[];
    groupTrainings: GroupTrainingDto[];
    subscriptionExpirationDate: string;
}

export interface PromotionDto {
    id: number,
    price: number,
    amountOfMonths: number,
    currency: Currency,
    validUntil: string,
    gymId: number
}

export interface UpsertPromotionDto {
    price: number,
    amountOfMonths: number,
    currency: Currency,
    validUntil: Date,
}

export interface PersonalTrainingDto {
    id: number,
    name: string,
    description: string,
    price: number,
    currency: Currency,
    professionalTrainerDto: ProfessionalTrainerDto
}

export interface ProfessionalTrainerDto {
    id: number,
    userId: number,
    username: string,
    phoneNumber: string,
    email: string,
    groupTrainings: Array<GroupTrainingDto>,
    personalTrainings: Array<PersonalTrainingDto>,
}

export interface GroupTrainingDto {
    id: number,
    name: string,
    description: string,
    price: number,
    currency: Currency,
    professionalTrainerId: number,
    professionalTrainerUsername: string,
}

export interface UpsertFitnessRestaurantDto {
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber: string;
    contactEmail: string;
    businessWebsite: string;
    avatar?: string;
}

export interface UpsertFitnessShopDto {
    id?: number;
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber: string;
    contactEmail: string;
    businessWebsite: string;
    avatar?: string;
    categories: string[];
    brands: string[];
}

export interface UpsertGymDto {
    userId: number;
    name: string;
    vicinity: string;
    latitude: number;
    longitude: number;
    description?: string;
    contactNumber: string;
    contactEmail: string;
    businessWebsite?: string;
    avatar?: string;
    dailyPassPrice: number;
    monthlySubscription: number;
    currency: Currency;
}

export interface UpsertGroupTrainingDto {
    name: string,
    description: string,
    price: number,
    currency: Currency,
    professionalTrainerId: number,
}

export interface UpsertPersonalTrainingDto {
    name: string,
    description: string,
    price: number,
    currency: Currency,
    professionalTrainerId: number,
}

export interface ProfessionalTrainerAutocompleteDto {
    professionalTrainerId: number,
    username: string,
}

export interface LocationInformationDto {
    vicinity: string,
    latitude: number
    longitude: number
}

export interface ContactInformationDto {
    contactNumber: string,
    contactEmail: string,
    businessWebsite: string,
}

export interface PricingDto {
    dailyPass: number,
    monthlySubscription: number,
}

export interface UpsertMealDto {
    name: string,
    calories: number,
    proteins: number,
    fats: number,
    carbs: number,
    price: number,
    currency: Currency,
    milliliters: number,
    category: FoodCategory,
    ingredients: Array<UpsertIngredientDto>,
}

export interface UpsertIngredientDto {
    name: string,
    quantity: number,
}

export interface OFFFoodItemDto {
    code: string,
    product: {
        product_name: string,
        product_name_ar?: string;
        product_name_de?: string;
        product_name_en?: string;
        product_name_es?: string;
        product_name_fr?: string;
        product_name_it?: string;
        product_name_ka?: string;
        product_name_nl?: string;
        product_name_pl?: string;
        product_name_pt?: string;
        nutrition_grades: string,
        nutriments: {
            carbohydrates_100g: number,
            carbohydrates_serving: number,
            carbohydrates_unit: string,
            'energy-kcal_100g': number,
            'energy-kcal_serving': number,
            'energy-kcal_unit': string,
            fat_100g: number,
            fat_serving: number,
            fat_unit: string,
            proteins_100g: number,
            proteins_serving: number,
            proteins_unit: string,
            salt_100g: number,
            salt_serving: number,
            salt_unit: string,
            sugars_100g: number,
            sugars_serving: number,
            sugars_unit: string,
            sodium_100g: number,
            sodium_serving: number,
            sodium_unit: string,
        }
    }
}

export interface USDASearch {
    foods: Array<USDAFoodItem>
}

export interface USDAFoodItem {
    fdcId: number;
    description: string;
    dataType: string;
    publishedDate: string;
    foodCategory: string;
    servingSizeUnit: string;
    servingSize: number;
    foodNutrients: Array<{
        nutrientId: number;
        nutrientName: string;
        unitName: string;
        value: number;
    }>;
}

export interface FoodItemDto {
    id: number;
    userId: number;
    mealType: MealType;
    name: string;
    caloriesPer100g: number;
    proteinsPer100g: number;
    fatsPer100g: number;
    carbsPer100g: number;
    quantity: number;
}

export interface UpsertFoodItemDto {
    userId: number;
    mealType: MealType;
    name: string;
    caloriesPer100g: number;
    proteinsPer100g: number;
    fatsPer100g: number;
    carbsPer100g: number;
    quantity: number;
}

export interface MealTrackDto {
    id: number,
    mealType: MealType,
    foodItems: Array<FoodItemDto>
    dayDate: Date,
}

export interface ExerciseDto {
    id: number,
    name: string,
    force: Force,
    level: ExerciseLevel,
    mechanic: Mechanic,
    equipment: string,
    category: ExerciseCategory,
    primaryMuscles: Array<string>,
    secondaryMuscles: Array<string>,
    instructions: Array<string>,
    images: Array<string>,
}

export interface ExerciseInWorkoutDto {
    id: number,
    exerciseId: number,
    name: string,
    reps: number,
    sets: number,
    weight: number,
    timeInMins: number,
}

export interface UpsertExerciseInWorkoutDto {
    reps: number,
    sets: number,
    weight: number,
    timeInMins: number,
    exerciseId: number,
    workoutId: number,
}

export interface UpsertWorkoutDto {
    name: string;
    dayDate: Date;
}

export interface WorkoutDto {
    id: number;
    name: string;
    exercises: Array<ExerciseInWorkoutDto>;
    dayDate: string;
}

export interface CommentDto {
    id: number;
    userId: number;
    postId: number;
    comment: string;
    creationDate: string;
}

export interface PostLikeDto {
    id: number;
    userId: number;
    postId: number;
}

export interface PostDto {
    id: number;
    userId: number;
    ownerUsername: string;
    title: string;
    description: string;
    image: string;
    ownerAvatar?: string;
    creationDate: string;
    mealId: number;
    workoutId: number;
    comments: CommentDto[];
    likes: PostLikeDto[];
}

export interface UpsertCommentDto {
    userId: number;
    postId: number;
    comment: string;
}

export interface UpsertPostDto {
    userId: number;
    title: string;
    description: string;
    image: string;
    mealId?: number;
    workoutId?: number;
}

export interface SubscriptionRequest {
    email: string;
    paymentMethodId?: string;
    priceId: string;
}

export interface ResubscribeRequest {
    venueId: number;
    priceId: string;
}

export interface SubscriptionResponse {
    id: string;
    status: string;
    customerId: string;
    clientSecret: string;
}

export interface AddGymRequest {
    upsertGymDto: UpsertGymDto;
    subscriptionResponse: SubscriptionResponse;
}

export interface AddFitnessShopRequest {
    upsertFitnessShopDto: UpsertFitnessShopDto;
    subscriptionResponse: SubscriptionResponse;
}

export interface AddFitnessRestaurantRequest {
    upsertFitnessRestaurantDto: UpsertFitnessRestaurantDto;
    subscriptionResponse: SubscriptionResponse;
}

export interface UpsertProfessionalTrainerDto {
    userId: number;
    username: string;
    phoneNumber: string;
    email: string;
}

export interface UpsertExerciseDto {
    userId: number;
    name: string;
    force: Force;
    level: ExerciseLevel;
    mechanic: Mechanic;
    instructions: string;
    category: ExerciseCategory;
    primaryMuscles: string[];
    secondaryMuscles: string[];
}

