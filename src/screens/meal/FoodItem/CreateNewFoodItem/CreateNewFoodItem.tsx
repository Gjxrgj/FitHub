import {ScrollView, View} from "react-native";
import {useForm} from "@tanstack/react-form";
import {MealType} from "../../../../enums/enums";
import {RootStackParamList, UpsertFoodItemDto} from "../../../../dto/types";
import {styles} from "../../../fitnessRestaurant/addMeal/styles";
import {Button, Text, TextInput} from "react-native-paper";
import {CustomTextInput} from "../../../../components/CustomTextInput/CustomTextInput";
import {ErrorDisplayComponent} from "../../../../components/ErrorDisplay/ErrorDisplayComponent";
import React from "react";
import {useAuth} from "../../../../context/AuthProvider";
import {createFoodItem} from "../../../../services";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {isNumber} from "lodash";
import {theme} from "../../../../theme/theme";

type CreateNewFoodItemNavigation = StackNavigationProp<RootStackParamList, 'CreateNewFoodItem'>;

export const CreateNewFoodItem = () => {
    const auth = useAuth();
    const navigation = useNavigation<CreateNewFoodItemNavigation>();
    const form = useForm({
        defaultValues: {
            name: '',
            caloriesPer100g: 0,
            proteinsPer100g: 0,
            fatsPer100g: 0,
            carbsPer100g: 0,
        },
        onSubmit: async ({value}) => {
            if (auth.user?.id) {
                const upsertFoodItemDto: UpsertFoodItemDto = {
                    name: value.name,
                    userId: auth.user?.id,
                    mealType: MealType.BREAKFAST,
                    quantity: 100,
                    carbsPer100g: Number(value.carbsPer100g),
                    caloriesPer100g:  Number(value.caloriesPer100g),
                    fatsPer100g:  Number(value.fatsPer100g),
                    proteinsPer100g:  Number(value.proteinsPer100g),
                }
                createFoodItem(upsertFoodItemDto)
                    .then(() => navigation.navigate("MyFoodItems"));
            }
        },
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{
                borderWidth: 1,
                borderColor: theme.colors.primary,
                borderRadius: 10,
                padding: 10,
                paddingVertical: 20,
                marginTop: '30%',
                margin: 10,
                backgroundColor: 'white'
            }}>
                <Text style={styles.title}>Create Food Item</Text>

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

                <form.Field name="caloriesPer100g" validators={{
                    onChange: ({value}) => !isNumber(value) && 'Calories must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Calories Per 100g"
                                keyboardType="numeric"
                                onChangeText={(text) => field.handleChange(Number(text) || 0)}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="kcal"/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>

                <form.Field name="proteinsPer100g" validators={{
                    onChange: ({value}) => !isNumber(value) && 'Proteins must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Proteins Per 100g"
                                keyboardType="numeric"
                                onChangeText={(text) => field.handleChange(Number(text) || 0)}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g"/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>

                <form.Field name="fatsPer100g" validators={{
                    onChange: ({value}) => !isNumber(value) && 'Fats must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Fats Per 100g"
                                keyboardType="numeric"
                                onChangeText={(text) => field.handleChange(Number(text) || 0)}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g"/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>

                <form.Field name="carbsPer100g" validators={{
                    onChange: ({value}) => !isNumber(value) && 'Carbs must be a number'
                }}>
                    {(field) => (
                        <View style={styles.inputContainer}>
                            <CustomTextInput
                                label="Carbs Per 100g"
                                keyboardType="numeric"
                                onChangeText={(text) => field.handleChange(Number(text) || 0)}
                                value={field.state.value.toString()}
                                right={<TextInput.Affix text="g"/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <Button style={{borderRadius: 2, marginHorizontal: 20, marginTop: 20}} mode={"contained"}
                        onPress={form.handleSubmit}>
                    Create
                </Button>
            </View>
        </ScrollView>
    );
}
