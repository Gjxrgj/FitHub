import { CustomView } from "../../../../components/CustomView/CustomView";
import { Text } from "react-native-paper";
import { theme } from "../../../../theme/theme";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { LoadingSpinner } from "../../../../components/LoadingSpinner/LoadingSpinner";
import { FoodItemDto, RootStackParamList, USDAFoodItem } from "../../../../dto/types";
import { CustomBottomNavigation } from "../../../../components/BottomNavigation/CustomBottomNavigation";
import React, { useEffect, useState } from "react";
import { getAllUserCreated } from "../../../../services";
import { useAuth } from "../../../../context/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type MyFoodItemsNavigation = StackNavigationProp<RootStackParamList, 'MyFoodItems'>;

export const MyFoodItems = () => {
    const navigation = useNavigation<MyFoodItemsNavigation>();
    const [foodItems, setFoodItems] = useState<Array<FoodItemDto>>([]);
    const [filteredFoodItems, setFilteredFoodItems] = useState<Array<FoodItemDto>>([]); // Added for filtered items
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setLoading(true);
        getAllUserCreated(auth.user?.id)
            .then(items => {
                setFoodItems(items);
                setFilteredFoodItems(items);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredFoodItems(foodItems);
        } else {
            const filtered = foodItems.filter(item => {
                const foodName = item.name || (item as USDAFoodItem).description || '';
                return foodName.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredFoodItems(filtered);
        }
    }, [searchTerm, foodItems]);

    return (
        <CustomView>
            <Text style={{
                fontSize: 30,
                fontWeight: 'normal',
                color: theme.colors.primary,
                marginHorizontal: "auto",
                marginVertical: 20,
                marginBottom: 40
            }}>My Food Items</Text>
            <View style={styles.searchContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="magnify" size={20} color={theme.colors.primary} />
                </View>
                <TextInput
                    style={styles.searchBar}
                    placeholder=""
                    placeholderTextColor={'#555'}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <View style={styles.IconXContainer}>
                    <TouchableOpacity onPress={() => setSearchTerm('')}>
                        <Icon name="close" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {filteredFoodItems.length === 0 && !loading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                    {loading && (
                        <LoadingSpinner />
                    )}
                    {!loading && filteredFoodItems &&
                        filteredFoodItems.map((item, index) => {
                            const isUSDAItem = (i: USDAFoodItem | FoodItemDto): i is USDAFoodItem => {
                                return (i as USDAFoodItem).fdcId !== undefined;
                            };

                            const isFoodItem = (i: USDAFoodItem | FoodItemDto): i is FoodItemDto => {
                                return (i as FoodItemDto).id !== undefined;
                            };

                            const foodName = isUSDAItem(item) ? item.description : isFoodItem(item) ? item.name : 'N/A';
                            const energy = isUSDAItem(item)
                                ? item.foodNutrients?.find(n => n.nutrientName === 'Energy')?.value || '0'
                                : isFoodItem(item)
                                    ? item.caloriesPer100g || '0'
                                    : '0';
                            const unit = isUSDAItem(item)
                                ? item.foodNutrients?.find(n => n.nutrientName === 'Energy')?.unitName?.toLowerCase() || ''
                                : isFoodItem(item)
                                    ? 'kcal'
                                    : '';

                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('MealScreen', {foodItem: item})}>
                                    <View style={styles.foodItemContainer}>
                                        <Text style={styles.foodName}>{foodName}</Text>
                                        <Text style={styles.foodItemText}>
                                            {energy} {unit} per 100 g
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
            <CustomBottomNavigation />
        </CustomView>
    );
};
