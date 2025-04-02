import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {MealType} from '../../../enums/enums.ts';
import {FoodItemDto, MealTrackDto, RootStackParamList, UpsertPostDto} from '../../../dto/types.ts';
import {CalorieOverview} from '../calorieOverview/CalorieOverview.tsx';
import moment from 'moment/moment';
import {useAuth} from '../../../context/AuthProvider.tsx';
import {getMealsForDay, removeFoodItem} from '../../../services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../theme/theme';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles.ts';
import {CustomBottomNavigation} from "../../../components/BottomNavigation/CustomBottomNavigation";
import {MealStatsModal} from "./mealStats/MealStatsModal";

const calculateMealCalories = (foodItems: Array<FoodItemDto>): number => {
    return foodItems.reduce((total, item) => {
        return total + (item.caloriesPer100g / 100) * item.quantity;
    }, 0);
};

type DayMealsScreenRouteProp = RouteProp<RootStackParamList, 'DayMealsScreen'>;
type DayMealsNavigation = StackNavigationProp<RootStackParamList, 'DayMealsScreen'>;


export const DayMealsScreen = () => {
    const auth = useAuth();
    const route = useRoute<DayMealsScreenRouteProp>();
    const mealTracks = route.params.meals;
    const upsertPostDto = route.params.upsertPostDto;
    const [date, setDate] = useState<moment.Moment>(moment());
    const [calorieIntake, setCalorieIntake] = useState<number>(0);
    const [meals, setMeals] = useState<Array<MealTrackDto>>(mealTracks ?? []);
    const navigation = useNavigation<DayMealsNavigation>();
    const [openMealStatsModal, setOpenMealStatsModal] = useState<boolean>(false);
    const [foodItemId, setFoodItemId] = useState<number | undefined>(undefined);
    const [foodItems, setFoodItems] = useState<Array<FoodItemDto> | undefined>(undefined);

    useFocusEffect(
        useCallback(() => {
            loadMealsForDay();
        }, []),
    );

    const loadMealsForDay = () => {
        if (auth.user?.id) {
            getMealsForDay(auth.user.id, date.format('YYYY-MM-DD'))
                .then(m => {
                    setMeals(m);
                    let sumCalories = 0;
                    m.map(mt => {
                        mt.foodItems.map(fi => {
                            sumCalories += (fi.caloriesPer100g / 100.0) * fi.quantity;
                            return;
                        });
                    });
                    setCalorieIntake(sumCalories);
                });
        }
    }

    const renderMealSection = (mealType: MealType) => {
        const meal = meals?.find(m => m.mealType === mealType);
        const foodItems = meal ? meal.foodItems : [];
        const totalCalories = foodItems.length > 0 ? calculateMealCalories(foodItems) : 0;

        return (
            <View key={mealType} style={styles.mealSection}>
               <TouchableOpacity onPress={() => {
                   setOpenMealStatsModal(true);
                   setFoodItems(foodItems);
                   setFoodItemId(undefined);
               }}>
                   <View style={styles.headersBox}>
                       <Text style={styles.mealTitle}>{mealType}</Text>
                       <Text style={styles.mealTitle}>{totalCalories.toFixed(0)} kcal</Text>
                   </View>
               </TouchableOpacity>
                {foodItems.length > 0 ? (
                    foodItems.map((foodItem) => (
                        <View key={foodItem.id} style={styles.foodItem}>
                            <TouchableOpacity onPress={() => {
                                setFoodItemId(foodItem.id);
                                setOpenMealStatsModal(true);
                            }}>
                                <View style={styles.foodItemDetailsRow}>
                                    <Text style={styles.foodItemText}>{foodItem.name}</Text>
                                    {!upsertPostDto && <TouchableOpacity
                                        onPress={() => removeFoodItem(foodItem.id).then(() => loadMealsForDay())}>
                                        <Icon style={{paddingVertical: 5, zIndex: 1000}}
                                              name="delete" size={25}
                                              color={theme.colors.error}/>
                                    </TouchableOpacity>
                                    }
                                </View>
                                <View style={styles.foodItemDetailsRow}>
                                    <Text style={[styles.foodItemDetails, {flex: 1}]}>
                                        {(foodItem.quantity).toFixed()} grams
                                    </Text>
                                    <Text style={[styles.foodItemDetails, {textAlign: 'right'}]}>
                                        {(foodItem.caloriesPer100g / 100 * foodItem.quantity).toFixed()} kcal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noItemsText}>No food items for this meal.</Text>
                )}
                {upsertPostDto ? foodItems.length > 0 && <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        if (!upsertPostDto?.userId) {
                            return;
                        }

                        const updatedPostDto: UpsertPostDto = {
                            userId: upsertPostDto?.userId,
                            mealId: meal?.id,
                            image: upsertPostDto?.image,
                            description: upsertPostDto?.description,
                            title: upsertPostDto?.title,
                            workoutId: upsertPostDto?.workoutId,
                        };
                        navigation.navigate('AddEditPostScreen', {upsertPostDto: updatedPostDto});
                    }}>
                    <Icon name="plus" size={20}
                          color={'white'}/>
                    <Text style={styles.addButtonText}>Link to post</Text>
                </TouchableOpacity> :
                    <TouchableOpacity style={styles.addButton} onPress={() => {
                        navigation.navigate('SearchMealScreen');
                    }}>
                        <Icon name="plus" size={20} color="white"/>
                        <Text style={styles.addButtonText}>Add Food</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: theme.colors.background}}>
            <ScrollView>
                {meals && <CalorieOverview
                    date={date}
                    setDate={setDate}
                    loadMealsForDay={loadMealsForDay}
                    calorieIntake={calorieIntake}
                    showButtons={false}
                    meals={meals}
                    dailyCalories={auth.user?.dailyCalories ?? 0}
                />}
                {renderMealSection(MealType.BREAKFAST)}
                {renderMealSection(MealType.LUNCH)}
                {renderMealSection(MealType.DINNER)}
                {renderMealSection(MealType.SNACK)}
            </ScrollView>
            <CustomBottomNavigation/>
            <MealStatsModal
                onClose={() => {
                    setOpenMealStatsModal(false);
                    setFoodItemId(undefined);
                    setFoodItems(undefined);
                }}
                foodItemId={foodItemId}
                foodItems={foodItems}
                visible={openMealStatsModal}/>
        </View>
    );
};
