import React, {useCallback, useRef, useState} from 'react';
import {Animated, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {MenuDto, RootStackParamList} from '../../../dto/types.ts';
import {FoodCategory} from '../../../enums/enums.ts';
import {styles} from './styles.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../../context/AuthProvider.tsx';
import {removeMeal} from '../../../services';
import {Button, FAB, Portal} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {theme} from "../../../theme/theme.ts";

type MenuScreenRouteProp = RouteProp<RootStackParamList, 'MenuScreen'>;
type MenuScreenNavigation = StackNavigationProp<RootStackParamList, 'MenuScreen'>;

export const MenuScreen = () => {
    const auth = useAuth();
    const route = useRoute<MenuScreenRouteProp>();
    const {menu, restaurantName, ownerId, fitnessRestaurantId} = route.params;
    const [menuDto, setMenuDto] = useState<MenuDto>(menu);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<MenuScreenNavigation>();
    const [fabVisible, setFabVisible] = useState<boolean>(true);

    useFocusEffect(
        useCallback(() => {
            setFabVisible(true);
        }, [])
    );
    const capitalizeCategory = (category: string) => {
        return category
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const groupedMeals = menuDto.meals.reduce((acc, meal) => {
        if (!acc[meal.category]) {
            acc[meal.category] = [];
        }
        acc[meal.category].push(meal);
        return acc;
    }, {} as Record<FoodCategory, Array<typeof menuDto.meals[0]>>);

    const handleFABPress = () => {
        setIsExpanded(!isExpanded);

        Animated.timing(animation, {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleMealTypeSelect = (mealType: FoodCategory) => {
        setIsExpanded(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
        }).start();
        setFabVisible(false);
        navigation.navigate('AddMealScreen', {fitnessRestaurantId: fitnessRestaurantId, foodCategory: mealType});
    };

    const animatedWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    const animatedTranslateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [250, -70],
    });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <View>
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
                <Text style={styles.header}>{restaurantName} Menu</Text>
                {Object.keys(FoodCategory).map((categoryKey) => {
                    const categoryMeals = groupedMeals[categoryKey as FoodCategory];
                    if (!categoryMeals || categoryMeals.length === 0) {
                        return null;
                    }

                    return (
                        <View key={categoryKey} style={styles.categorySection}>
                            <Text style={styles.categoryHeader}>
                                {capitalizeCategory(categoryKey)}
                            </Text>
                            {categoryMeals.map((meal) => (
                                <View key={meal.id} style={styles.mealContainer}>
                                    <View style={styles.nameDelete}>
                                        <Text style={styles.mealName}>{meal.name}</Text>
                                        {ownerId === auth.user?.id &&
                                            <TouchableOpacity onPress={() => {
                                                removeMeal(meal.id)
                                                    .then(m => setMenuDto(m));
                                            }}>
                                                <Icon name={'delete'} size={30} color={theme.colors.error}/>
                                            </TouchableOpacity>}
                                    </View>

                                    <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Calories</Text>
                                        <Text style={styles.mealValue}>{meal.calories} kcal</Text>
                                    </View>
                                    <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Proteins</Text>
                                        <Text style={styles.mealValue}>{meal.proteins} g</Text>
                                    </View>
                                    <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Fats</Text>
                                        <Text style={styles.mealValue}>{meal.fats} g</Text>
                                    </View>
                                    <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Carbs</Text>
                                        <Text style={styles.mealValue}>{meal.carbs} g</Text>
                                    </View>
                                    {meal.milliliters !== 0 && <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Volume</Text>
                                        <Text style={styles.mealValue}>{meal.milliliters} ml</Text>
                                    </View>}
                                    <View style={styles.mealRow}>
                                        <Text style={styles.mealText}>Price</Text>
                                        <Text style={styles.mealValue}>{meal.price} {meal.currency}</Text>
                                    </View>


                                    <View style={styles.ingredientContainer}>
                                        <Text style={styles.ingredientTitle}>Ingredients</Text>
                                        {meal.ingredients.map((ingredient) => (
                                            <View key={ingredient.id} style={styles.mealRow}>
                                                <Text style={styles.ingredientText}>{ingredient.name}</Text>
                                                <Text style={styles.ingredientValue}>{ingredient.quantity} g</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </ScrollView>
            {fabVisible && ownerId === auth.user?.id &&
                <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20, paddingRight: 40}}>
                    <Portal>
                        <Animated.View
                            style={{
                                width: animatedWidth,
                                opacity: animatedOpacity,
                                transform: [{translateX: animatedTranslateX}],
                                position: 'absolute',
                                bottom: 15,
                                right: 16,
                                backgroundColor: theme.colors.primary,
                                borderRadius: 10,
                                padding: 10,
                                paddingRight: 160,
                            }}
                        >
                            <View>
                                <Button
                                    mode="text"
                                    onPress={() => handleMealTypeSelect(FoodCategory.BREAKFAST)}
                                    style={styles.mealTypeButton}
                                    icon={() => <Icon name="plus" size={20} color="white"/>}
                                >
                                    <Text style={styles.buttonText}>Breakfast</Text>
                                </Button>
                                <Button
                                    mode="text"
                                    onPress={() => handleMealTypeSelect(FoodCategory.MAIN_DISHES)}
                                    style={styles.mealTypeButton}
                                    icon={() => <Icon name="plus" size={20} color="white"/>}
                                >
                                    <Text style={styles.buttonText}>Main Dish</Text>
                                </Button>
                                <Button
                                    mode="text"
                                    onPress={() => handleMealTypeSelect(FoodCategory.SNACK)}
                                    style={styles.mealTypeButton}
                                    icon={() => <Icon name="plus" size={20} color="white"/>}
                                >
                                    <Text style={styles.buttonText}>Snack</Text>
                                </Button>
                                <Button
                                    mode="text"
                                    onPress={() => handleMealTypeSelect(FoodCategory.DRINKS)}
                                    style={styles.mealTypeButton}
                                    icon={() => <Icon name="plus" size={20} color="white"/>}
                                >
                                    <Text style={styles.buttonText}>Beverage</Text>
                                </Button>
                            </View>
                        </Animated.View>

                        <FAB
                            style={{
                                position: 'absolute',
                                margin: 16,
                                right: 0,
                                bottom: 0,
                                backgroundColor: theme.colors.primary,
                            }}
                            icon={isExpanded ? 'close' : 'plus'}
                            onPress={handleFABPress}
                        />
                    </Portal>
                </View>}
        </View>
    );
};
