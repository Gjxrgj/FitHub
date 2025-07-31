import {useForm} from "@tanstack/react-form";
import {useAuth} from "../../../../../context/AuthProvider";
import {ScrollView, View} from "react-native";
import {CustomTextInput} from "../../../../../components/CustomTextInput/CustomTextInput";
import {ErrorDisplayComponent} from "../../../../../components/ErrorDisplay/ErrorDisplayComponent";
import React, {useState} from "react";
import {Button, Modal, Portal, RadioButton, Text, TextInput} from "react-native-paper";
import {ActivityLevel, Goal} from "../../../../../enums/enums";
import {theme} from "../../../../../theme/theme";
import {styles} from "./styles";
import {RootStackParamList, UpdatePersonalInfoDto} from "../../../../../dto/types";
import {updatePersonalInfo} from "../../../../../services";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";

type EditPersonalInfoScreenNavigation = StackNavigationProp<RootStackParamList, 'EditPersonalInfoScreen'>;

export const EditPersonalInfoScreen = () => {
    const {user, setUser} = useAuth();
    const [visibleGoal, setVisibleGoal] = useState(false);
    const [visibleActivityLevel, setVisibleActivityLevel] = useState(false);
    const navigation = useNavigation<EditPersonalInfoScreenNavigation>();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const form = useForm({
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            height: user?.height,
            weight: user?.weight,
            birthDate: user?.birthDate,
            goal: user?.goal,
            activityLevel: user?.activityLevel
        },
        onSubmit: ({value}): void => {
            const updatePersonalInfoDto: UpdatePersonalInfoDto = {
                firstName: value.firstName,
                lastName: value.lastName,
                weight: value.weight,
                height: value.height,
                birthDate: value.birthDate ? moment(value.birthDate).format('YYYY-MM-DD') : '',
                goal: value.goal,
                activityLevel: value.activityLevel
            }
            updatePersonalInfo(user?.id, updatePersonalInfoDto)
                .then((updateUser) => {
                    setUser(updateUser);
                    navigation.navigate("Profile", {userId: user?.id});
                })
        },
    });

    return (
        <>
            <ScrollView style={{height: "100%"}}>
                <Text style={styles.sectionTitle}>Edit personal info</Text>
                <form.Field name={'firstName'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label={'First name'}
                                onChangeText={(text: string) => field.handleChange(text)}
                                value={field.state.value}/>
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={'lastName'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label={'Last name'}
                                onChangeText={(text: string) => field.handleChange(text)}
                                value={field.state.value}/>
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={'birthDate'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label={'Birth Date'}
                                keyboardType={"numeric"}
                                onPressIn={() => setShowDatePicker(true)}
                                value={field.state.value ? moment(field.state.value).format('DD.MM.YYYY') : ''}
                            />
                            {showDatePicker && (
                                <DateTimePicker
                                    value={field.state.value ? new Date(field.state.value) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(_, value) => {
                                        field.handleChange(value);
                                        setShowDatePicker(false);
                                    }}
                                />
                            )}
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={'height'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label="Height"
                                keyboardType={"numeric"}
                                value={field.state.value ? field.state.value.toString() : 0}
                                onChangeText={value => field.handleChange(value)}
                                right={<TextInput.Affix text={user?.units === 'IMPERIAL' ? 'feet' : 'cm'}/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={'weight'}>
                    {(field) => (
                        <View>
                            <CustomTextInput
                                label="Weight"
                                keyboardType={"numeric"}
                                value={field.state.value ? field.state.value.toString() : 0}
                                onChangeText={value => field.handleChange(value)}
                                right={<TextInput.Affix text={user?.units === 'IMPERIAL' ? 'lbs' : 'kg'}/>}
                            />
                            <ErrorDisplayComponent errorMessages={field.state.meta.errors}/>
                        </View>
                    )}
                </form.Field>
                <form.Field name={"goal"}>
                    {(field) => (
                        <View style={{marginHorizontal: 10, marginBottom: 15, marginTop: 10}}>
                            <Button
                                mode="contained"
                                labelStyle={{color: '#333333'}}
                                style={styles.goalButton}
                                onPress={() => setVisibleGoal(true)}>
                                Select Goal
                            </Button>
                            <Portal>
                                <Modal visible={visibleGoal} onDismiss={() => setVisibleGoal(false)}
                                       contentContainerStyle={styles.modalContainer}>
                                    <Text style={styles.modalTitle}>Select Your Goal</Text>
                                    <RadioButton.Group
                                        onValueChange={(value) => {
                                            const goal: Goal = Goal[value as keyof typeof Goal];
                                            field.handleChange(goal);
                                        }}
                                        value={field.state.value as Goal}>
                                        <View style={styles.radioGroupContainer}>
                                            <RadioButton.Item
                                                label="Gradual Weight Loss"
                                                value={Goal.GRADUAL_WEIGHT_LOSS}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Moderate Weight Loss"
                                                value={Goal.MODERATE_WEIGHT_LOSS}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Extreme Weight Loss"
                                                value={Goal.EXTREME_WEIGHT_LOSS}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Muscle Gain"
                                                value={Goal.MUSCLE_GAIN}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Maintain"
                                                value={Goal.MAINTAIN}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                        </View>
                                    </RadioButton.Group>
                                    <Button onPress={() => setVisibleGoal(false)}>
                                        Save
                                    </Button>
                                </Modal>
                            </Portal>
                        </View>
                    )}
                </form.Field>
                <form.Field name={"activityLevel"}>
                    {(field) => (
                        <View style={{marginHorizontal: 10}}>
                            <Button
                                mode="contained"
                                labelStyle={{color: '#333333'}}
                                style={styles.goalButton}
                                onPress={() => setVisibleActivityLevel(true)}>
                                Select Activity Level
                            </Button>
                            <Portal>
                                <Modal visible={visibleActivityLevel} onDismiss={() => setVisibleActivityLevel(false)}
                                       contentContainerStyle={styles.modalContainer}>
                                    <Text style={styles.modalTitle}>Select Your Activity Level</Text>
                                    <RadioButton.Group
                                        onValueChange={(value) => {
                                            const activityLevel: ActivityLevel = ActivityLevel[value as keyof typeof ActivityLevel];
                                            field.handleChange(activityLevel);
                                        }}
                                        value={field.state.value as ActivityLevel}
                                    >
                                        <View style={styles.radioGroupContainer}>
                                            <RadioButton.Item
                                                label="Sedentary"
                                                value={ActivityLevel.SEDENTARY}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Lightly Active"
                                                value={ActivityLevel.LIGHT}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Moderately Active"
                                                value={ActivityLevel.MODERATE}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Active"
                                                value={ActivityLevel.ACTIVE}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                            <RadioButton.Item
                                                label="Very Active"
                                                value={ActivityLevel.VERY_ACTIVE}
                                                color={theme.colors.primary}
                                                style={styles.radioButton}
                                            />
                                        </View>
                                    </RadioButton.Group>
                                    <Button onPress={() => setVisibleActivityLevel(false)}>
                                        Save
                                    </Button>
                                </Modal>
                            </Portal>
                        </View>
                    )}
                </form.Field>
            </ScrollView>
            <Button mode="contained" style={{borderRadius: 0, position: "absolute", width: "100%", bottom: 0}}
                    onPress={form.handleSubmit}>
                Update
            </Button>
        </>
    );
}
