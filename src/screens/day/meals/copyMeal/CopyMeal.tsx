import React, {useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {useForm} from "@tanstack/react-form";
import {RootStackParamList, UpsertFoodItemDto} from "../../../../dto/types";
import {RouteProp, useNavigation, useRoute} from "@react-navigation/native";
import {CustomTextInput} from "../../../../components/CustomTextInput/CustomTextInput";
import moment from "moment/moment";
import {Button, Snackbar} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {ErrorDisplayComponent} from "../../../../components/ErrorDisplay/ErrorDisplayComponent";
import {theme} from "../../../../theme/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {addMultipleFoodItems} from "../../../../services";
import {Picker} from "@react-native-picker/picker";
import {MealType} from "../../../../enums/enums";
import {capitalizeFirstLetter} from "../../../../util/stringUtil";
import {styles} from "./styles";

type CopyMealRootProp = RouteProp<RootStackParamList, "CopyMeal">;

export const CopyMeal = () => {
    const route = useRoute<CopyMealRootProp>();
    const {params} = route || {};
    const initialFoodItems = params?.foodItems || [];
    const [foodItems, setFoodItems] = useState(initialFoodItems);
    const navigation = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const form = useForm({
        defaultValues: {
            quantities: foodItems.reduce((acc, item) => {
                acc[item.id] = item.quantity || 100;
                return acc;
            }, {} as Record<number, number>),
            date: new Date(),
            mealType: MealType.BREAKFAST
        },
        onSubmit: ({value}): void => {
            const quantities: Record<number, number> = value.quantities;
            const upsertFoodItems = foodItems.map((foodItem) => {
                return {
                    name: foodItem.name,
                    userId: foodItem.userId,
                    quantity: quantities[foodItem.id],
                    mealType: value.mealType,
                    fatsPer100g: foodItem.fatsPer100g,
                    carbsPer100g: foodItem.carbsPer100g,
                    proteinsPer100g: foodItem.proteins_100g,
                    caloriesPer100g: foodItem.caloriesPer100g,
                } as UpsertFoodItemDto;
            });


            addMultipleFoodItems(upsertFoodItems, moment(value.date).format("YYYY-MM-DD"))
                .then(() => {
                    setShowSnackbar(true);
                });
        },
    });

    const handleRemoveFoodItem = (itemId: number) => {
        const updatedFoodItems = foodItems.filter(item => item.id !== itemId);
        setFoodItems(updatedFoodItems);
    };

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', paddingVertical: 20}}>Copy meal</Text>
            <FlatList
                data={foodItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <form.Field name={`quantities`}>
                        {(field) => {
                            const value = field.state.value[item.id];
                            const factor = value / 100;
                            return (
                                <View style={styles.card}>
                                    <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                                        <Text style={styles.foodName}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => handleRemoveFoodItem(item.id)}>
                                            <Icon name="close" size={24} color={"#555"}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.quantityContainer}>
                                            <CustomTextInput
                                                keyboardType="numeric"
                                                value={String(value)}
                                                onChangeText={(text) => {
                                                    const updatedQuantities = field.state.value;
                                                    updatedQuantities[item.id] = Number(text) || 0;
                                                    field.handleChange(updatedQuantities);
                                                }}
                                                label="Quantity"
                                            />
                                        </View>

                                        <View style={styles.nutrientContainer}>
                                            <View style={{flexDirection: "row", width: 200}}>
                                                <Text style={styles.nutrient}>
                                                    Protein: {(item.proteinsPer100g * factor).toFixed(1)}g
                                                </Text>
                                                <Text style={styles.nutrient}>
                                                    Fats: {(item.fatsPer100g * factor).toFixed(1)}g
                                                </Text>
                                            </View>
                                            <View style={{flexDirection: "row"}}>
                                                <Text style={styles.nutrient}>
                                                    Carbs: {(item.carbsPer100g * factor).toFixed(1)}g
                                                </Text>
                                                <Text style={styles.nutrient}>
                                                    Calories: {(item.caloriesPer100g * factor).toFixed(0)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    </form.Field>
                )}
                ListFooterComponent={
                    <View>
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
                                                <Picker.Item key={key} label={`${capitalizeFirstLetter(value)}`}
                                                             value={value}/>
                                            ))}
                                        </Picker>
                                    </View>
                                </View>
                            )}
                        </form.Field>
                        <form.Field name={"date"} validators={{}}>
                            {(field) => (
                                <View>
                                    <CustomTextInput
                                        label={"Date"}
                                        style={{marginHorizontal: 0, marginBottom: 15}}
                                        keyboardType={"numeric"}
                                        onPressIn={() => setShowDatePicker(true)}
                                        value={field.state.value ? moment(field.state.value).format("DD.MM.YYYY") : ""}
                                    />
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={field.state.value ? new Date(field.state.value) : new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(_, value) => {
                                                field.handleChange(moment(value).format("YYYY-MM-DD"));
                                                setShowDatePicker(false);
                                            }}
                                        />
                                    )}
                                    <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                                </View>
                            )}
                        </form.Field>
                        <Button style={{borderRadius: 2}} mode={"contained"} onPress={form.handleSubmit}>
                            Submit
                        </Button>
                    </View>
                }
            />
            <Snackbar
                visible={showSnackbar}
                onDismiss={() => {
                    setShowSnackbar(false);
                    navigation.navigate('Home');
                }}
                duration={2000}
                style={styles.snackbar}
            >
                <Text>Meal has been successfully copied
                    to {moment(form.getFieldValue("date")).format("DD.MM.YYYY")}</Text>
            </Snackbar>
        </View>
    );
};

