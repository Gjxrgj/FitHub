import React, {useCallback, useRef, useState} from 'react';
import {RootStackParamList, UpsertUserDto} from '../../dto/types.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {Button, HelperText, ProgressBar, RadioButton, Text} from 'react-native-paper';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Gender} from '../../enums/enums.ts';
import {styles} from "./styles.ts";
import {theme} from "../../theme/theme.ts";
import {pickImage} from "../../util/imageUtil";
import {usernameAlreadyExists} from "../../services";
import _ from "lodash";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";

type SignUpStep2RouteProp = RouteProp<RootStackParamList, 'SignUpStep2'>;
type SignUpStep2NavigationProp = StackNavigationProp<RootStackParamList, 'SignUpStep2'>;

const validateUsername = (username: string): { isValid: boolean; errorMessage?: string } => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 30;

    if (username.length < MIN_LENGTH) {
        return {isValid: false, errorMessage: 'Username must be at least 3 characters long.'};
    }

    if (username.length > MAX_LENGTH) {
        return {isValid: false, errorMessage: 'Username must be no more than 30 characters long.'};
    }

    return {isValid: true};
};

const validateAge = (age: string): { isValid: boolean; errorMessage?: string } => {

    if (age === '') {
        return {isValid: false, errorMessage: 'Age cant be blank.'};
    }

    return {isValid: true};
};

export const SignUpScreen2: React.FC = () => {
    const route = useRoute<SignUpStep2RouteProp>();
    const navigation = useNavigation<SignUpStep2NavigationProp>();
    const {userDto} = route.params;
    const [updatedUserDto, setUpdatedUserDto] = useState<UpsertUserDto>(userDto);
    const [usernameError, setUsernameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleImagePick = useCallback(() => {
        pickImage()
            .then((data) => handleChange("avatar", data))
    }, []);

    const handleChange = (key: keyof UpsertUserDto, value: any) => {
        if (key === 'username') {
            debounceCheckUsernameExists(value);
            const {isValid, errorMessage} = validateUsername(value);
            setUsernameError(isValid ? '' : errorMessage || 'Invalid username.');
            setUpdatedUserDto(prev => ({...prev, [key]: value}));
        } else if (key === 'birthDate') {
            const {isValid, errorMessage} = validateAge(value);
            setAgeError(isValid ? '' : errorMessage || 'Invalid birth date.');
            setUpdatedUserDto(prev => ({...prev, [key]: moment(value).format("YYYY-MM-DD")}));
        } else {
            setUpdatedUserDto(prev => ({...prev, [key]: value}));
        }
    };

    const debounceCheckUsernameExists = useRef(
        _.debounce(async (input: string) => {
            try {
                usernameAlreadyExists(input)
                    .then((exists) => {
                        if (exists) {
                            setUsernameError('Username already exists.');
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        }, 500),
    ).current;

    const checkFormValid = () => {
        return validateUsername(updatedUserDto.username).isValid
            && usernameError !== "Username already exists."
            && validateAge(updatedUserDto.birthDate.toString()).isValid;
    };

    return (
        <>
            <ScrollView>
                <ProgressBar progress={2 / 3} color={theme.colors.primary} style={{height: 10}}/>
                <ScrollView>
                    <Text
                        style={{fontSize: 40, textAlign: 'center', marginVertical: 60}}>
                        Sign Up
                    </Text>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity onPress={handleImagePick}>
                            {updatedUserDto.avatar ? (
                                <Image source={{uri: updatedUserDto.avatar}} style={styles.avatar}/>
                            ) : (
                                <Text style={styles.avatarPlaceholder}>Select a Photo</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                    <CustomTextInput
                        label="Username"
                        value={updatedUserDto.username}
                        onChangeText={text => handleChange('username', text)}
                    />
                    <HelperText type="error" style={{display: usernameError ? 'flex' : 'none'}}>
                        {usernameError || 'Username is required'}
                    </HelperText>
                    <View>
                        <CustomTextInput
                            label={'Birth Date'}
                            keyboardType={"numeric"}
                            onPressIn={() => setShowDatePicker(true)}
                            value={updatedUserDto.birthDate ? moment(updatedUserDto.birthDate).format('DD.MM.YYYY') : ''}
                        />
                        {showDatePicker && (
                            <DateTimePicker
                                value={updatedUserDto.birthDate ? new Date(updatedUserDto.birthDate) : new Date()}
                                mode="date"
                                display="default"
                                onChangeText={text => handleChange('birthDate', text)}
                                onChange={(_, value) => {
                                    handleChange("birthDate", value);
                                    setShowDatePicker(false);
                                }}
                            />
                        )}
                        <HelperText type="error" style={{display: ageError ? 'flex' : 'none'}}>
                            {ageError || 'Birth date is required'}
                        </HelperText>
                    </View>
                    <CustomTextInput
                        label="Short bio"
                        multiline
                        numberOfLines={4}
                        value={updatedUserDto.bio}
                        onChangeText={text => handleChange('bio', text)}
                    />
                    <View style={styles.pickerContainer}>
                        <Text style={styles.pickerLabelScreen2}>Gender</Text>
                        <RadioButton.Group
                            onValueChange={value => handleChange('gender', value)}
                            value={updatedUserDto.gender}
                        >
                            <RadioButton.Item
                                label="Male"
                                value={Gender.MALE}
                                color={theme.colors.primary}
                                style={styles.radioButtonScreen2}
                            />
                            <RadioButton.Item
                                label="Female"
                                value={Gender.FEMALE}
                                color={theme.colors.primary}
                                style={styles.radioButtonScreen2}
                            />
                        </RadioButton.Group>
                    </View>
                </ScrollView>
            </ScrollView>
            <Button mode="contained" style={{borderRadius: 0}} onPress={() => {
                if (checkFormValid()) {
                    navigation.navigate('SignUpStep3', {userDto: updatedUserDto});
                }
            }}>
                Next
            </Button>
        </>
    );
};

