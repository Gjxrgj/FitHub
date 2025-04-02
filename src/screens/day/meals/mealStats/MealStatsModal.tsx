import {Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import React, {FC, useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import {getById} from "../../../../services";
import {FoodItemDto, RootStackParamList} from "../../../../dto/types";
import {styles} from "./styles";
import {theme} from "../../../../theme/theme";
import {capitalizeFirstLetter} from "../../../../util/stringUtil";
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

interface MealStatsProps {
    visible: boolean;
    foodItemId?: number;
    foodItems?: Array<FoodItemDto>;
    onClose: () => void;
}

type MealStatsModalNavigation = StackNavigationProp<RootStackParamList, 'MealStatsModal'>;

export const MealStatsModal: FC<MealStatsProps> = ({
                                                       foodItemId,
                                                       foodItems,
                                                       onClose,
                                                       visible
                                                   }) => {
    const [foodItem, setFoodItem] = useState<FoodItemDto | undefined>(undefined);
    const [calories, setCalories] = useState<number>(0);
    const navigation = useNavigation<MealStatsModalNavigation>();
    useEffect(() => {
        if (foodItemId) {
            getById(foodItemId)
                .then(item => {
                    setFoodItem(item);
                });
        }
    }, [foodItemId, foodItems]);

    useEffect(() => {
        let calories = 0;

        if (foodItems) {
            foodItems.forEach(item => {
                calories = calories + (item.caloriesPer100g * item.quantity) / 100;
            })
        } else {
            calories = (foodItem?.caloriesPer100g * foodItem?.quantity) / 100;
        }
        setCalories(calories);
    }, [foodItem, foodItems, foodItemId]);


    const renderMacronutrientRow = () => {
        let protein = 0;
        let fats = 0;
        let carbs = 0;
        if (foodItems) {
            foodItems.forEach(item => {
                protein = protein + (item.proteinsPer100g * item.quantity) / 100;
                fats = fats + (item.fatsPer100g * item.quantity) / 100;
                carbs = protein + (item.carbsPer100g * item.quantity) / 100;
            })
        } else {
            protein = (foodItem?.proteinsPer100g * foodItem?.quantity) / 100;
            fats = (foodItem?.fatsPer100g * foodItem?.quantity) / 100;
            carbs = (foodItem?.carbsPer100g * foodItem?.quantity) / 100;
        }
        return (
            <View style={styles.macroRow}>
                <View style={styles.macroColumn}>
                    <Text
                        style={[styles.macroValue, {color: theme.colors.tertiary}]}>{(protein).toFixed(1)}g
                    </Text>
                    <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroColumn}>
                    <Text
                        style={[styles.macroValue, {color: theme.colors.primary}]}>{(fats).toFixed(1)}g
                    </Text>
                    <Text style={styles.macroLabel}>Fats</Text>
                </View>
                <View style={styles.macroColumn}>
                    <Text
                        style={[styles.macroValue, {color: theme.colors.error}]}>{(carbs).toFixed(1)}g
                    </Text>
                    <Text style={styles.macroLabel}>Carbs</Text>
                </View>
            </View>
        );
    };

    return (
        <Modal visible={visible} animationType="fade" transparent={true}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <TouchableWithoutFeedback onPress={() => {
                    onClose();
                    setFoodItem(undefined);
                }}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    onPress={() => onClose()}
                                    style={styles.closeButtonReviews}
                                >
                                    <Icon style={{margin: 'auto'}} name="close" size={30} color="#555"/>
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>
                                    Macro
                                    for {capitalizeFirstLetter(foodItems?.[0]?.mealType || foodItem?.name || "this meal")}
                                </Text>
                                <View>
                                    <View style={styles.caloriesContainer}>
                                        <Text
                                            style={[styles.macroValue, {color: '#ffcb2d'}]}>{(calories).toFixed(1)} kcal</Text>
                                        <Text style={styles.macroLabel}>Calories</Text>
                                    </View>
                                    {renderMacronutrientRow()}
                                    {foodItems &&
                                        <Button mode={"contained"} style={{marginTop: 20, borderRadius: 2}}
                                                onPress={() => navigation.navigate("CopyMeal", {foodItems: foodItems})}>
                                            Copy meal
                                        </Button>
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </Modal>
    );
}
