import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {OFFFoodItemDto, RootStackParamList, UpsertFoodItemDto, USDAFoodItem, FoodItemDto} from '../../../dto/types.ts';
import {theme} from '../../../theme/theme.ts';
import {useForm} from '@tanstack/react-form';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MealType} from '../../../enums/enums.ts';
import {Picker} from '@react-native-picker/picker';
import {capitalizeFirstLetter} from '../../../util/stringUtil.ts';
import {CustomTextInput} from '../../../components/CustomTextInput/CustomTextInput.tsx';
import {useAuth} from '../../../context/AuthProvider.tsx';
import {addFoodItem} from '../../../services';
import {styles} from './styles.ts';
import {ErrorDisplayComponent} from '../../../components/ErrorDisplay/ErrorDisplayComponent.tsx';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

type MealScreenRouteProp = RouteProp<RootStackParamList, 'MealScreen'>;
type MealScreenNavigation = StackNavigationProp<RootStackParamList, 'MealScreen'>;

export const FoodItemScreen = () => {
    const auth = useAuth();
    const navigation = useNavigation<MealScreenNavigation>();
    const route = useRoute<MealScreenRouteProp>();
    const {foodItem} = route.params;
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const form = useForm({
        defaultValues: {
            quantity: 0,
            mealType: MealType.BREAKFAST,
            date: new Date(),
        },
        onSubmit: ({value}): void => {
            const date = value.date;
            if (auth.user?.id) {
                const upsertFoodItem: UpsertFoodItemDto = {
                    name: foodName,
                    userId: auth.user.id,
                    mealType: value.mealType,
                    quantity: value.quantity,
                    fatsPer100g: fats,
                    carbsPer100g: carbs,
                    caloriesPer100g: calories,
                    proteinsPer100g: protein,
                };
                addFoodItem(upsertFoodItem, date)
                    .then(() => navigation.navigate('DayMealsScreen', {meals: undefined}));
            }
        },
    });

    useEffect(() => {
        AsyncStorage.getItem('mealType').then(mealType => {
            form.setFieldValue('mealType', mealType);
        });
    }, []);

    const isUSDAFoodItem = (item: USDAFoodItem | OFFFoodItemDto | FoodItemDto): item is USDAFoodItem => {
        return (item as USDAFoodItem).fdcId !== undefined;
    };

    const isFoodItemDto = (item: USDAFoodItem | OFFFoodItemDto | FoodItemDto): item is FoodItemDto => {
        return (item as FoodItemDto).id !== undefined;
    };

    const renderMacronutrientRow = () => (
        <View style={styles.macroRow}>
            <View style={styles.macroColumn}>
                <Text style={[styles.macroValue, {color: theme.colors.tertiary}]}>{protein}g</Text>
                <Text style={styles.macroLabel}>Protein</Text>
            </View>
            <View style={styles.macroColumn}>
                <Text style={[styles.macroValue, {color: theme.colors.primary}]}>{fats}g</Text>
                <Text style={styles.macroLabel}>Fats</Text>
            </View>
            <View style={styles.macroColumn}>
                <Text style={[styles.macroValue, {color: theme.colors.error}]}>{carbs}g</Text>
                <Text style={styles.macroLabel}>Carbs</Text>
            </View>
        </View>
    );

    const foodName = isUSDAFoodItem(foodItem)
        ? foodItem.description || ''
        : isFoodItemDto(foodItem)
            ? foodItem.name
            : foodItem.product.product_name;

    const protein = isUSDAFoodItem(foodItem)
        ? foodItem.foodNutrients?.find(n => n.nutrientName === 'Protein')?.value || 0
        : isFoodItemDto(foodItem)
            ? foodItem.proteinsPer100g
            : foodItem.product.nutriments.proteins_100g || 0;

    const fats = isUSDAFoodItem(foodItem)
        ? foodItem.foodNutrients?.find(n => n.nutrientName === 'Total lipid (fat)')?.value || 0
        : isFoodItemDto(foodItem)
            ? foodItem.fatsPer100g
            : foodItem.product.nutriments.fat_100g || 0;

    const carbs = isUSDAFoodItem(foodItem)
        ? foodItem.foodNutrients?.find(n => n.nutrientName === 'Carbohydrate, by difference')?.value || 0
        : isFoodItemDto(foodItem)
            ? foodItem.carbsPer100g
            : foodItem.product.nutriments.carbohydrates_100g || 0;

    const calories = isUSDAFoodItem(foodItem)
        ? foodItem.foodNutrients?.find(n => n.nutrientName === 'Energy')?.value || 0
        : isFoodItemDto(foodItem)
            ? foodItem.caloriesPer100g
            : foodItem.product.nutriments['energy-kcal_100g'] || 0;


    return (
        <ScrollView style={styles.container}>
            <View style={styles.nutritionContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {isUSDAFoodItem(foodItem) ? foodItem.description : isFoodItemDto(foodItem) ? foodItem.name : foodItem.product.product_name}
                    </Text>
                </View>
                <View style={styles.per100gLabel}>
                    <Text style={{color: '#6c6b6b', textAlign: 'center'}}>
                        Per 100g
                    </Text>
                </View>
                <View style={styles.caloriesContainer}>
                    <Text style={[styles.macroValue, {color: '#ffcb2d'}]}>{calories} kcal</Text>
                    <Text style={styles.macroLabel}>Calories</Text>
                </View>
                {renderMacronutrientRow()}
                <View style={styles.fullWidth}>
                    <Text style={styles.addMealText}> Add To Meal</Text>
                </View>
                <form.Field name={'mealType'}>
                    {(field) => (
                        <View style={styles.mealTypeContainer}>
                            <View style={styles.mealLabelContainer}>
                                <Text style={styles.mealLabelText}>
                                    Meal
                                </Text>
                            </View>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    borderWidth: 1,
                                    borderRadius: 2,
                                    borderColor: theme.colors.primary,
                                }}
                            >
                                <Picker
                                    mode={'dropdown'}
                                    selectedValue={field.getValue()}
                                    onValueChange={(itemValue) => form.setFieldValue('mealType', itemValue)}
                                    style={{
                                        height: 55,
                                        color: '#555',
                                    }}
                                    itemStyle={{height: 40, fontWeight: 'normal'}}
                                >
                                    {Object.entries(MealType).map(([key, value]) => (
                                        <Picker.Item key={key} label={`${capitalizeFirstLetter(value)}`} value={value}/>
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    )}
                </form.Field>
                <form.Field
                    name={'quantity'}
                    validators={{
                        onChange: ({value}) => {
                            if (value === 0) {
                                return 'Quantity cannot be 0!';
                            }
                        },
                    }}>
                    {(field) => (
                        <View style={{marginBottom: 15}}>
                            <CustomTextInput
                                label={'Quantity in grams'}
                                keyboardType={"numeric"}
                                onChangeText={(text) => field.handleChange(parseFloat(text) || 0)}
                                value={field.state.value.toString()}/>
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={'date'}>
                    {(field) => (
                        <View>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput
                                    label="Day"
                                    value={
                                        field.state.value
                                            ? new Date(field.state.value).toLocaleDateString('en-GB')
                                            : ''
                                    }
                                    editable={false}
                                    mode="outlined"
                                    outlineColor={theme.colors.primary}
                                    style={styles.modalInput}
                                />
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker
                                    value={field.state.value || new Date()}
                                    mode="date"
                                    display="compact"

                                    onChange={(event, date) => {
                                        field.handleChange(date || new Date());
                                        setShowDatePicker(false);
                                    }}
                                    minimumDate={new Date()}
                                />
                            )}
                        </View>
                    )}
                </form.Field>
                <Button style={{marginTop: 10, marginHorizontal: 10, borderRadius: 2}} onPress={form.handleSubmit} mode={"contained"}>
                    Add To Meal
                </Button>
            </View>
        </ScrollView>
    );
};
