import React, {useState} from 'react';
import {RootStackParamList, UpsertUserDto} from '../../dto/types.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {Button, HelperText, Modal, Portal, ProgressBar, RadioButton, Text, TextInput} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {ActivityLevel, Goal, Unit} from '../../enums/enums.ts';
import {register} from "../../services";
import {styles} from "./styles.ts";
import {theme} from "../../theme/theme.ts";

type SignUpScreen3NavigationProp = StackNavigationProp<RootStackParamList, 'SignUpStep3'>;
type SignUpStep3RouteProp = RouteProp<RootStackParamList, 'SignUpStep3'>;

const validateHeight = (height: string): { isValid: boolean; errorMessage?: string } => {
    if (height.length === 0) {
        return {isValid: false, errorMessage: 'Height can not be blank.'};
    }

    if (!Number(height)) {
        return {isValid: false, errorMessage: 'Height has to be a number.'};
    }

    if (Number(height) < 1) {
        return {isValid: false, errorMessage: 'Height must be a positive number.'};
    }
    return {isValid: true};
};
const validateWeight = (weight: string): { isValid: boolean; errorMessage?: string } => {

    if (weight.length === 0) {
        return {isValid: false, errorMessage: 'Weight can not be blank.'};
    }
    if (!Number(weight)) {
        return {isValid: false, errorMessage: 'Weight has to be a number.'};
    }

    if (Number(weight) < 1) {
        return {isValid: false, errorMessage: 'Weight must be a positive number.'};
    }
    return {isValid: true};
};
export const SignUpScreen3: React.FC = () => {
    const navigation = useNavigation<SignUpScreen3NavigationProp>();
    const route = useRoute<SignUpStep3RouteProp>();

    const {userDto} = route.params;
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUint, setWeightUnit] = useState('kg');
    const [heightError, setHeightError] = useState('');
    const [weightError, setWeightError] = useState('');

    const [updatedUserDto, setUpdatedUserDto] = useState<UpsertUserDto>(userDto);

    const [visibleGoal, setVisibleGoal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(updatedUserDto.goal);
    const showGoalModal = () => setVisibleGoal(true);
    const hideGoalModal = () => setVisibleGoal(false);


    const [visibleActivity, setVisibleActivity] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(updatedUserDto.activityLevel);
    const showActivityModal = () => setVisibleActivity(true);
    const hideActivityModal = () => setVisibleActivity(false);

    const handleGoalChange = (value: string) => {
        const goal: Goal = Goal[value as keyof typeof Goal];
        setSelectedGoal(goal);
        handleChange('goal', goal);
        hideGoalModal();
    };

    const handleActivityChange = (value: string) => {
        const activity: ActivityLevel = ActivityLevel[value as keyof typeof ActivityLevel];
        setSelectedActivity(activity);
        handleChange('activityLevel', activity);
        hideActivityModal();
    };
    const handleChange = (key: keyof UpsertUserDto, value: any) => {
        setUpdatedUserDto(prev => ({...prev, [key]: value}));
        if (key === 'units') {
            if (value === Unit.METRIC) {
                setHeightUnit('cm');
                setWeightUnit('kg');
            } else {
                setHeightUnit('in');
                setWeightUnit('lbs');
            }
        }
        if (key === 'height') {
            const {isValid, errorMessage} = validateHeight(value);
            setHeightError(isValid ? '' : errorMessage || 'Invalid height.');
        } else if (key === 'weight') {
            const {isValid, errorMessage} = validateWeight(value);
            setWeightError(isValid ? '' : errorMessage || 'Invalid weight.');
        }
    };

    const checkFormValid = () => {
        handleChange('weight', updatedUserDto.weight);
        handleChange('height', updatedUserDto.height);
        return heightError === '' &&
            weightError === '';
    };

    return (
        <>
            <ProgressBar progress={3 / 3} color={theme.colors.primary} style={{height: 10}}/>
            <ScrollView style={{ marginHorizontal: 10}}>
                <Text
                    style={{fontSize: 40, textAlign: 'center', marginVertical: 60}}>
                    Sign Up
                </Text>
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerLabel}>Units</Text>
                    <RadioButton.Group
                        onValueChange={value => handleChange('units', value)}
                        value={updatedUserDto.units}
                    >
                        <View style={styles.radioGroupContainer}>
                            <RadioButton.Item
                                label="Metric"
                                value={Unit.METRIC}
                                color={theme.colors.primary}
                                style={styles.radioButton}
                            />
                            <RadioButton.Item
                                label="Imperial"
                                value={Unit.IMPERIAL}
                                color={theme.colors.primary}
                                style={styles.radioButton}
                            />
                        </View>
                    </RadioButton.Group>
                </View>
                <CustomTextInput
                    label="Height"
                    keyboardType={"numeric"}
                    value={updatedUserDto.height === 0 ? '' : updatedUserDto.height.toString()}
                    onChangeText={value => handleChange('height', value)}
                    style={styles.input}
                    right={<TextInput.Affix text={heightUnit}/>}
                />
                <HelperText type="error" style={{display: heightError ? 'flex' : 'none'}}>
                    {heightError || 'First name is required'}
                </HelperText>
                <CustomTextInput
                    label="Weight"
                    keyboardType={"numeric"}
                    value={updatedUserDto.weight === 0 ? '' : updatedUserDto.weight.toString()}
                    onChangeText={value => handleChange('weight', value)}
                    style={styles.input}
                    right={<TextInput.Affix text={weightUint}/>}
                />
                <HelperText type="error" style={{display: weightError ? 'flex' : 'none'}}>
                    {weightError || 'First name is required'}
                </HelperText>
                <Button
                    mode="contained"
                    labelStyle={{color: '#333333'}}
                    style={styles.goalButton}
                    onPress={showGoalModal}>
                    Select Goal
                </Button>
                <Portal>
                    <Modal visible={visibleGoal} onDismiss={hideGoalModal}
                           contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Your Goal</Text>
                        <RadioButton.Group
                            onValueChange={handleGoalChange}
                            value={selectedGoal}
                        >
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
                    </Modal>
                </Portal>
                <Button
                    mode="contained"
                    labelStyle={{color: '#333333'}}
                    style={styles.goalButton}
                    onPress={showActivityModal}>
                    Select Activity Level
                </Button>
                <Portal>
                    <Modal visible={visibleActivity} onDismiss={hideActivityModal}
                           contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select Your Activity Level</Text>
                        <RadioButton.Group
                            onValueChange={handleActivityChange}
                            value={selectedActivity}
                        >
                            <View style={styles.radioGroupContainer}>
                                <RadioButton.Item
                                    label="Lightly Active"
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
                                    label="Lightly Active"
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
                    </Modal>
                </Portal>
            </ScrollView>
            <Button mode="contained" style={{borderRadius: 0}} onPress={() => {
                if (checkFormValid()) {
                    register(updatedUserDto).then(() => navigation.navigate('Login'));
                }
            }}>
                Register
            </Button>
        </>
    );
};

