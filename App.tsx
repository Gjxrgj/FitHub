import React from 'react';
import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PaperProvider} from 'react-native-paper';
import {AuthProvider, useAuth} from './src/context/AuthProvider';
import {LoginScreen} from './src/screens/login/LoginScreen.tsx';
import {SignUpScreen1} from './src/screens/signUp/SignUpScreen1';
import {SignUpScreen2} from './src/screens/signUp/SignUpScreen2';
import {SignUpScreen3} from './src/screens/signUp/SignUpScreen3';
import {HomeScreen} from './src/screens/home/HomeScreen.tsx';
import {MapScreen} from './src/screens/map/MapScreen.tsx';
import {ProfileScreen} from './src/screens/profile/ProfileScreen.tsx';
import {AddVenueScreen} from './src/screens/venue/AddVenueScreen.tsx';
import {MyVenuesScreen} from './src/screens/venue/MyVenuesScreen.tsx';
import {GymScreen} from './src/screens/gym/GymScreen.tsx';
import {LoadingSpinner} from './src/components/LoadingSpinner/LoadingSpinner.tsx';
import {FitnessShopScreen} from './src/screens/fitnessShop/FitnessShopScreen.tsx';
import {FitnessRestaurantScreen} from './src/screens/fitnessRestaurant/FitnessRestaurantScreen.tsx';
import {MenuScreen} from './src/screens/fitnessRestaurant/menu/MenuScreen.tsx';
import {AddMealScreen} from './src/screens/fitnessRestaurant/addMeal/AddMealScreen.tsx';
import {theme} from './src/theme/theme.ts';
import {BarcodeScanner} from './src/components/BarcodeScanner/BarcodeScanner.tsx';
import {FoodItemScreen} from './src/screens/meal/FoodItem/FoodItemScreen.tsx';
import {SearchMealScreen} from './src/screens/meal/SearchMealScreen/SearchMealScreen.tsx';
import {DayMealsScreen} from "./src/screens/day/meals/DayMealsScreen.tsx";
import {SearchExerciseScreen} from "./src/screens/exercise/SearchExerciseScreen/SearchExerciseScreen.tsx";
import {AddExerciseToWorkoutScreen} from "./src/screens/exercise/AddExerciseToWorkout/AddExerciseToWorkoutScreen.tsx";
import {DayWorkoutsScreen} from "./src/screens/day/workouts/DayWorkoutsScreen.tsx";
import {AddEditPostScreen} from "./src/screens/post/AddEditPostScreen.tsx";
import {StatusBar} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {CommentsScreen} from "./src/screens/home/CommentsScreen";
import {EditPersonalInfoScreen} from "./src/screens/profile/component/Account/EditPersonalInfo/EditPersonalInfoScreen";
import {StripeProvider} from "@stripe/stripe-react-native";
import Constants from "expo-constants";
import {Resubscribe} from "./src/components/Resubscribe/Resubscribe";
import {SearchFriends} from "./src/screens/friends/SearchFriends";
import {PostWorkout} from "./src/screens/post/PostWorkout/PostWorkout";
import {PostMeal} from "./src/screens/post/PostMeal/PostMeal";
import {
    BecomeProfessionalTrainer
} from "./src/screens/profile/component/Account/ProfessionalTrainer/BecomeProfessionalTrainer";
import {CopyMeal} from "./src/screens/day/meals/copyMeal/CopyMeal";
import {CopyEditWorkoutScreen} from "./src/screens/day/workouts/CopyEditWorkout/CopyEditWorkoutScreen";
import {MyFoodItems} from "./src/screens/meal/FoodItem/MyFoodItems/MyFoodItems";
import {CreateNewFoodItem} from "./src/screens/meal/FoodItem/CreateNewFoodItem/CreateNewFoodItem";
import {MyExercises} from "./src/screens/exercise/MyExercises/MyExercises";
import {CreateNewExercise} from "./src/screens/exercise/CreateNewExercise/CreateNewExercise";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthStackScreen = () => (
    <AuthStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <AuthStack.Screen name="Login" component={LoginScreen}/>
        <AuthStack.Screen name="SignUpStep1" component={SignUpScreen1}/>
        <AuthStack.Screen name="SignUpStep2" component={SignUpScreen2}/>
        <AuthStack.Screen name="SignUpStep3" component={SignUpScreen3}/>
    </AuthStack.Navigator>
);

const AppStackScreen = () => (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <AppStack.Screen name="Map" component={MapScreen}/>
        <AppStack.Screen name="Home" component={HomeScreen}/>
        <AppStack.Screen name="PostMeal" component={PostMeal}/>
        <AppStack.Screen name="CopyMeal" component={CopyMeal}/>
        <AppStack.Screen name="GymScreen" component={GymScreen}/>
        <AppStack.Screen name="MenuScreen" component={MenuScreen}/>
        <AppStack.Screen name="Profile" component={ProfileScreen}/>
        <AppStack.Screen name="MyExercises" component={MyExercises}/>
        <AppStack.Screen name="MyFoodItems" component={MyFoodItems}/>
        <AppStack.Screen name="PostWorkout" component={PostWorkout}/>
        <AppStack.Screen name="Resubscribe" component={Resubscribe}/>
        <AppStack.Screen name="MyVenues" component={MyVenuesScreen}/>
        <AppStack.Screen name="AddVenue" component={AddVenueScreen}/>
        <AppStack.Screen name="MealScreen" component={FoodItemScreen}/>
        <AppStack.Screen name="AddMealScreen" component={AddMealScreen}/>
        <AppStack.Screen name="SearchFriends" component={SearchFriends}/>
        <AppStack.Screen name="BarcodeScanner" component={BarcodeScanner}/>
        <AppStack.Screen name="DayMealsScreen" component={DayMealsScreen}/>
        <AppStack.Screen name="CommentsScreen" component={CommentsScreen}/>
        <AppStack.Screen name="SearchMealScreen" component={SearchMealScreen}/>
        <AppStack.Screen name="CreateNewExercise" component={CreateNewExercise}/>
        <AppStack.Screen name="FitnessShopScreen" component={FitnessShopScreen}/>
        <AppStack.Screen name="DayWorkoutsScreen" component={DayWorkoutsScreen}/>
        <AppStack.Screen name="AddEditPostScreen" component={AddEditPostScreen}/>
        <AppStack.Screen name="CreateNewFoodItem" component={CreateNewFoodItem}/>
        <AppStack.Screen name="CopyEditWorkout" component={CopyEditWorkoutScreen}/>
        <AppStack.Screen name="SearchExerciseScreen" component={SearchExerciseScreen}/>
        <AppStack.Screen name="EditPersonalInfoScreen" component={EditPersonalInfoScreen}/>
        <AppStack.Screen name="FitnessRestaurantScreen" component={FitnessRestaurantScreen}/>
        <AppStack.Screen name="BecomeProfessionalTrainer" component={BecomeProfessionalTrainer}/>
        <AppStack.Screen name="AddExerciseToWorkoutScreen" component={AddExerciseToWorkoutScreen}/>
    </AppStack.Navigator>
);

const RootNavigator = () => {

    const {user, loading} = useAuth();

    if (loading) {
        return (
            <LoadingSpinner/>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStackScreen/> : <AuthStackScreen/>}
        </NavigationContainer>
    );
};

const App = () => (
    <AuthProvider>
        <PaperProvider theme={theme}>
            <StripeProvider publishableKey={Constants.expoConfig.extra.STRIPE_PUBLISHABLE_API_KEY}>
                <GestureHandlerRootView style={{flex: 1}}>
                    <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary}/>
                    <RootNavigator/>
                </GestureHandlerRootView>
            </StripeProvider>
        </PaperProvider>
    </AuthProvider>
);

export default App;
