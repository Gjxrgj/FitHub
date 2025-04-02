import React, {useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FoodItemDto, RootStackParamList, USDAFoodItem} from '../../../dto/types.ts';
import {useNavigation} from '@react-navigation/native';
import {CustomView} from '../../../components/CustomView/CustomView.tsx';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../theme/theme.ts';
import {styles} from './styles.ts';
import _ from 'lodash';
import {Text} from 'react-native-paper';
import {searchUsdaFoods} from '../../../services';
import {CustomBottomNavigation} from '../../../components/BottomNavigation/CustomBottomNavigation.tsx';
import {LoadingSpinner} from '../../../components/LoadingSpinner/LoadingSpinner.tsx';
import {fetchRecentMealTracks} from "../../../services";
import {useAuth} from "../../../context/AuthProvider.tsx";

type SearchMealScreenNavigation = StackNavigationProp<RootStackParamList, 'SearchMealScreen'>;

export const SearchMealScreen = () => {
    const navigation = useNavigation<SearchMealScreenNavigation>();
    const [loading, setLoading] = useState(false);
    const [foodItems, setFoodItems] = useState<Array<USDAFoodItem | FoodItemDto>>([]);
    const [historyFoodItem, setHistoryFoodItems] = useState<Array<FoodItemDto>>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const auth = useAuth();

    const debouncedFetchFoods = useRef(
        _.debounce(async (input: string) => {
            setFoodItems([]);
            setLoading(true);
            try {
                const search = await searchUsdaFoods(input);
                setFoodItems(search.foods);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }, 500),
    ).current;

    useEffect(() => {
        if (searchTerm && searchTerm.length > 1) {
            debouncedFetchFoods(searchTerm);
        } else {
            debouncedFetchFoods.cancel();
            setFoodItems(historyFoodItem);
            setLoading(false);
        }
    }, [debouncedFetchFoods, historyFoodItem, searchTerm]);

    useEffect(() => {
        if (auth.user?.id) {
            fetchRecentMealTracks(auth.user?.id)
                .then(mealTracks => {
                    setFoodItems(mealTracks.flatMap(meal => meal.foodItems));
                    setHistoryFoodItems(mealTracks.flatMap(meal => meal.foodItems));
                });
        }
    }, [auth.user?.id]);

    return (
        <CustomView>
            <Text style={{
                fontSize: 30,
                fontWeight: 'normal',
                color: theme.colors.primary,
                marginHorizontal: "auto",
                marginVertical: 20
            }}>Food items</Text>
            <View style={styles.searchContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="magnify" size={20} color={theme.colors.primary}/>
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
                        <Icon name="close" size={20} color={theme.colors.primary}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10, marginBottom: 10}}>
                <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('BarcodeScanner')}>
                    <Icon name="qrcode-scan" size={60} color={theme.colors.primary}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('CreateNewFoodItem')}>
                    <Icon name="plus" size={60} color={theme.colors.primary}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('MyFoodItems')}>
                    <Icon name="food-variant" size={60} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {foodItems && foodItems.length === 0 && !loading && (
                        <Text style={styles.noResultsText}>No results found</Text>
                    )}
                    {loading && (
                        <LoadingSpinner/>
                    )}
                    {!loading && foodItems &&
                        foodItems.map((item, index) => {
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
                                <TouchableOpacity key={index}
                                                  onPress={() => navigation.navigate('MealScreen', {foodItem: item})}>
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
            <CustomBottomNavigation/>
        </CustomView>
    );
};
