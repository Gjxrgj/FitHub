import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../day/meals/styles";
import {getMealById} from "../../../services";
import {FoodItemDto, MealTrackDto, RootStackParamList} from "../../../dto/types";
import React, {useEffect, useState} from "react";
import {MealStatsModal} from "../../day/meals/mealStats/MealStatsModal";
import {RouteProp, useRoute} from "@react-navigation/native";

type DayMealsScreenRouteProp = RouteProp<RootStackParamList, 'PostMeal'>;

export const PostMeal = () => {
    const route = useRoute<DayMealsScreenRouteProp>();
    const mealId = route.params.mealId;
    const [meal, setMeal] = useState<MealTrackDto | undefined>(undefined);
    const [foodItems, setFoodItems] = useState<Array<FoodItemDto>>([])
    const [tempFoodItems, setTempFoodItems] = useState<Array<FoodItemDto> | undefined>(undefined)
    const [openMealStatsModal, setOpenMealStatsModal] = useState<boolean>(false);
    const [foodItemId, setFoodItemId] = useState<number | undefined>(undefined);
    const calculateMealCalories = (): number => {
        return foodItems.reduce((total, item) => {
            return total + (item.caloriesPer100g / 100) * item.quantity;
        }, 0);
    };

    useEffect(() => {
        getMealById(mealId)
            .then(m => {
                setMeal(m);
                setFoodItems(m.foodItems);
            });
    }, [mealId]);

    useEffect(() => {
        if(foodItemId){
            setOpenMealStatsModal(true);
        }
    }, [foodItemId]);

    return (
        <View style={styles.mealSection}>
            <TouchableOpacity onPress={() => {
                setOpenMealStatsModal(true);
                setTempFoodItems(foodItems)
                setFoodItemId(undefined);
            }}>
                <View style={styles.headersBox}>
                    <Text style={styles.mealTitle}>{meal?.mealType}</Text>
                    <Text style={styles.mealTitle}>{calculateMealCalories().toFixed(0)} kcal</Text>
                </View>
            </TouchableOpacity>
            {foodItems?.length > 0 ? (
                foodItems.map((foodItem) => (
                    <View key={foodItem.id} style={styles.foodItem}>
                        <TouchableOpacity onPress={() => {
                            setFoodItemId(foodItem.id);
                        }}>
                            <View style={styles.foodItemDetailsRow}>
                                <Text style={styles.foodItemText}>{foodItem.name}</Text>
                            </View>
                            <View style={styles.foodItemDetailsRow}>
                                <Text style={[styles.foodItemDetails, {flex: 1}]}>
                                    {(foodItem?.quantity || 0).toFixed()} grams
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
            <MealStatsModal
                onClose={() => {
                    setOpenMealStatsModal(false);
                    setFoodItemId(undefined);
                    setTempFoodItems(undefined);
                }}
                foodItemId={foodItemId}
                foodItems={tempFoodItems}
                visible={openMealStatsModal}/>
        </View>
    );
}
