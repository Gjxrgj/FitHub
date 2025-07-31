import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useForm} from '@tanstack/react-form';
import {RootStackParamList, UpsertIngredientDto, UpsertMealDto} from '../../../dto/types.ts';
import {Currency, FoodCategory} from '../../../enums/enums.ts';
import React, {useState} from 'react';
import {CustomTextInput} from '../../../components/CustomTextInput/CustomTextInput.tsx';
import {Button, Text, TextInput} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {addMeal} from '../../../services';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles.ts';
import {AddIngredientModal} from '../addIngredient/AddIngredientModal.tsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ErrorDisplayComponent} from "../../../components/ErrorDisplay/ErrorDisplayComponent.tsx";
import {theme} from "../../../theme/theme.ts";

type AddMealScreenRouteProp = RouteProp<RootStackParamList, 'AddMealScreen'>;
type AddMealNavigation = StackNavigationProp<RootStackParamList, 'AddMealScreen'>;

export const AddMealScreen = () => {
    const navigation = useNavigation<AddMealNavigation>();
    const route = useRoute<AddMealScreenRouteProp>();
    const {fitnessRestaurantId, foodCategory} = route.params;
    const [ingredients, setIngredients] = useState<Array<UpsertIngredientDto>>([]);
    const [showIngredientModal, setShowIngredientModal] = useState<boolean>(false);
    const isNumber = (value: string) => /^-?\d+(\.\d+)?$/.test(value);

    const form = useForm({
        defaultValues: {
            name: '',
            calories: '',
            proteins: '',
            fats: '',
            carbs: '',
            price: '',
            currency: Currency.MKD,
            milliliters: '',
            category: foodCategory,
            ingredients: [] as UpsertIngredientDto[],
        },
        onSubmit: async ({value}) => {
            const upsertMealDto: UpsertMealDto = {
                name: value.name,
                calories: parseFloat(value.calories),
                proteins: parseFloat(value.proteins),
                fats: parseFloat(value.fats),
                carbs: parseFloat(value.carbs),
                price: parseFloat(value.price),
                currency: value.currency,
                milliliters: parseFloat(value.milliliters),
                category: value.category,
                ingredients: ingredients,
            };
            addMeal(fitnessRestaurantId, upsertMealDto)
                .then(() => {
                    navigation.navigate('FitnessRestaurantScreen', {restaurantId: fitnessRestaurantId});
                });
        },
    });
    const updateIngredients = (ingredient: UpsertIngredientDto) => {
        setIngredients(prevState => [...prevState, ingredient]);
    };

    return (
        <View style={{ height: '100%' }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Add Meal</Text>

                <form.Field name="name">
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Name"
                                onChangeText={field.handleChange}
                                value={field.state.value}
                            />
                        </View>
                    )}
                </form.Field>

                <form.Field name="calories" validators={{
                    onChange: ({ value }) => !isNumber(value) && 'Calories must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Calories"
                                keyboardType="numeric"
                                onChangeText={field.handleChange}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="kcal" />}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                        </View>
                    )}
                </form.Field>

                <form.Field name="proteins" validators={{
                    onChange: ({ value }) => !isNumber(value) && 'Proteins must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Proteins"
                                keyboardType="numeric"
                                onChangeText={field.handleChange}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g" />}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                        </View>
                    )}
                </form.Field>

                <form.Field name="fats" validators={{
                    onChange: ({ value }) => !isNumber(value) && 'Fats must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Fats"
                                keyboardType="numeric"
                                onChangeText={field.handleChange}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g" />}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                        </View>
                    )}
                </form.Field>

                <form.Field name="carbs" validators={{
                    onChange: ({ value }) => !isNumber(value) && 'Carbs must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Carbs"
                                keyboardType="numeric"
                                onChangeText={field.handleChange}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g" />}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                        </View>
                    )}
                </form.Field>

                {foodCategory === FoodCategory.DRINKS && (
                    <form.Field name="milliliters" validators={{
                        onChange: ({ value }) => !isNumber(value) && 'Milliliters must be a number'
                    }}>
                        {(field) => (
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    label="Milliliters"
                                    keyboardType="numeric"
                                    onChangeText={field.handleChange}
                                    value={field.state.value.toString()}
                                    right={<TextInput.Affix text="ml" />}
                                />
                                <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                            </View>
                        )}
                    </form.Field>
                )}

                <form.Field name="price" validators={{
                    onChange: ({ value }) => !isNumber(value) && 'Price must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Price"
                                keyboardType="numeric"
                                onChangeText={field.handleChange}
                                value={field.state.value.toString()}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors} />
                        </View>
                    )}
                </form.Field>

                <form.Field name="currency">
                    {(field) => (
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={styles.label}>Currency</Text>
                            <View style={styles.pickerView}>
                                <Picker
                                    selectedValue={field.state.value}
                                    onValueChange={(itemValue) => form.setFieldValue('currency', itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select currency" value="" />
                                    {Object.entries(Currency).map(([key, value]) => (
                                        <Picker.Item key={key} label={`${value}`} value={value} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    )}
                </form.Field>

                <View style={styles.ingredientsContainer}>
                    <View style={styles.ingredientsAddContainer}>
                        <Text style={styles.ingredientsTitle}>Ingredients</Text>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: theme.colors.primary,
                                borderRadius: 5,
                            }}
                            onPress={() => setShowIngredientModal(true)}
                        >
                            <Icon name="plus" size={30} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {ingredients.length > 0 ? (
                        ingredients.map((item, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text>{item.name}</Text>
                                <Text style={styles.quantity}>{item.quantity}g</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.noIngredientsText}>No ingredients added</Text>
                    )}
                </View>

                <Button mode="contained" onPress={form.handleSubmit} style={styles.submitButton}>
                    Add Meal
                </Button>
            </ScrollView>

            <AddIngredientModal
                visible={showIngredientModal}
                onClose={() => setShowIngredientModal(false)}
                updateIngredients={updateIngredients}
            />
        </View>
    );
};
