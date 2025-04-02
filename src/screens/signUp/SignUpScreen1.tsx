import React, {useRef, useState} from 'react';
import {Button, HelperText, ProgressBar, Text, TextInput} from 'react-native-paper';
import {RootStackParamList, UpsertUserDto} from '../../dto/types.ts';
import {ActivityLevel, Gender, Goal, Unit} from '../../enums/enums.ts';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../theme/theme.ts';
import _ from "lodash";
import {emailAlreadyExists} from "../../services";

const validatePassword = (password: string): { isValid: boolean; errorMessage?: string } => {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 20;

    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < MIN_LENGTH) {
        return {isValid: false, errorMessage: 'Password must be at least 8 characters long.'};
    }

    if (password.length > MAX_LENGTH) {
        return {isValid: false, errorMessage: 'Password must be no more than 20 characters long.'};
    }

    if (!hasUpperCase.test(password)) {
        return {isValid: false, errorMessage: 'Password must include at least one uppercase letter.'};
    }

    if (!hasNumber.test(password)) {
        return {isValid: false, errorMessage: 'Password must include at least one number.'};
    }

    if (!hasSpecialChar.test(password)) {
        return {isValid: false, errorMessage: 'Password must include at least one special character.'};
    }

    return {isValid: true};
};

const validateFirstName = (firstName: string): { isValid: boolean; errorMessage?: string } => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 30;

    if (firstName.length < MIN_LENGTH) {
        return {isValid: false, errorMessage: 'First name must be at least 3 characters long.'};
    }

    if (firstName.length > MAX_LENGTH) {
        return {isValid: false, errorMessage: 'First name must be no more than 30 characters long.'};
    }

    if (!/^[A-Za-z]+$/.test(firstName)) {
        return {isValid: false, errorMessage: 'First name must contain only letters.'};
    }

    return {isValid: true};
};

const validateLastName = (lastName: string): { isValid: boolean; errorMessage?: string } => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 30;

    if (lastName.length < MIN_LENGTH) {
        return {isValid: false, errorMessage: 'Last name must be at least 3 characters long.'};
    }

    if (lastName.length > MAX_LENGTH) {
        return {isValid: false, errorMessage: 'Last name must be no more than 30 characters long.'};
    }

    if (!/^[A-Za-z]+$/.test(lastName)) {
        return {isValid: false, errorMessage: 'Last name must contain only letters.'};
    }

    return {isValid: true};
};

const validateEmail = (email: string): { isValid: boolean; errorMessage?: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
        return {isValid: false, errorMessage: "Email can't be blank."};
    }

    if (!emailRegex.test(email)) {
        return {isValid: false, errorMessage: 'Email must be valid.'};
    }

    return {isValid: true};
};

type SignUpScreen1Navigation = StackNavigationProp<RootStackParamList, 'SignUpStep1'>;


export const SignUpScreen1: React.FC = () => {
    const navigation = useNavigation<SignUpScreen1Navigation>();

    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');


    const [userDto, setUserDto] = useState<UpsertUserDto>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        avatar: undefined,
        bio: '',
        weight: 0,
        height: 0,
        birthDate: '',
        units: Unit.METRIC,
        gender: Gender.MALE,
        goal: Goal.EXTREME_WEIGHT_LOSS,
        activityLevel: ActivityLevel.ACTIVE,
    });

    const validateRepeatPassword = (repeatPassword: string): { isValid: boolean; errorMessage?: string } => {
        if (!(userDto.password === repeatPassword && userDto.password.length > 0)) {
            return {isValid: false, errorMessage: 'Passwords not matching.'};
        }

        return {isValid: true};
    };

    const debounceCheckEmailExists = useRef(
        _.debounce(async (input: string) => {
            try {
                emailAlreadyExists(input)
                    .then((exists) => {
                        if (exists) {
                            setEmailError('Email already exists.');
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        }, 500),
    ).current;

    const handleChange = (key: keyof UpsertUserDto, value: any) => {
        setUserDto(prev => ({...prev, [key]: value.trim()}));
        if (key === 'firstName') {
            const {isValid, errorMessage} = validateFirstName(value);
            setFirstNameError(isValid ? '' : errorMessage || 'Invalid first name.');
        } else if (key === 'lastName') {
            const {isValid, errorMessage} = validateLastName(value);
            setLastNameError(isValid ? '' : errorMessage || 'Invalid last name.');
        } else if (key === 'email') {
            debounceCheckEmailExists(value);
            const {isValid, errorMessage} = validateEmail(value);
            setEmailError(isValid ? '' : errorMessage || 'Invalid email.');
        } else if (key === 'password') {
            const {isValid, errorMessage} = validatePassword(value);
            setPasswordError(isValid ? '' : errorMessage || 'Invalid email.');
        } else if (key === 'repeatPassword') {
            const {isValid, errorMessage} = validateRepeatPassword(value);
            setRepeatPasswordError(isValid ? '' : errorMessage || 'Invalid email.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const checkFormValid = () => {
        return (
            validateFirstName(userDto.firstName).isValid &&
            validateLastName(userDto.lastName).isValid &&
            validateEmail(userDto.email).isValid &&
            emailError !== "Email already exists." &&
            validatePassword(userDto.password).isValid &&
            validateRepeatPassword(userDto.repeatPassword).isValid
        );
    };

    return (
        <>
            <ProgressBar progress={1 / 3} color={theme.colors.primary} style={{height: 10}}/>
            <Text
                style={{fontSize: 40, textAlign: 'center', marginTop: 40}}>
                Sign Up
            </Text>
            <CustomView>

                <CustomTextInput
                    label="First Name"
                    value={userDto.firstName}
                    onChangeText={text => handleChange('firstName', text)}
                />
                <HelperText type="error" style={{display: firstNameError ? 'flex' : 'none'}}>
                    {firstNameError || 'First name is required'}
                </HelperText>
                <CustomTextInput
                    label="Last Name"
                    value={userDto.lastName}
                    onChangeText={text => handleChange('lastName', text)}
                />
                <HelperText type="error" style={{display: lastNameError ? 'flex' : 'none'}}>
                    {lastNameError || 'Last name is required'}
                </HelperText>
                <CustomTextInput
                    label="Email"
                    value={userDto.email}
                    onChangeText={text => handleChange('email', text)}
                />
                <HelperText type="error" style={{display: emailError ? 'flex' : 'none'}}>
                    {emailError || 'Email is required'}
                </HelperText>
                <CustomTextInput
                    label="Password"
                    value={userDto.password}
                    secureTextEntry={!showPassword}
                    onChangeText={text => handleChange('password', text)}
                    right={
                        <TextInput.Icon
                            icon={() => (
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#000"/>
                                </TouchableOpacity>
                            )}
                        />
                    }
                />
                <HelperText type="error" style={{display: passwordError ? 'flex' : 'none'}}>
                    {passwordError || 'Password is required'}
                </HelperText>
                <CustomTextInput
                    label="Repeat password"
                    value={userDto.repeatPassword}
                    secureTextEntry={true}
                    onChangeText={text => handleChange('repeatPassword', text)}
                />
                <HelperText type="error" style={{display: repeatPasswordError ? 'flex' : 'none'}}>
                    {repeatPasswordError || 'Password is required'}
                </HelperText>
            </CustomView>
            <Button mode="contained" style={{borderRadius: 0}} onPress={() => {
                if (checkFormValid()) {
                    navigation.navigate('SignUpStep2', {userDto});
                }
            }}>
                Next
            </Button>
        </>
    );
};
