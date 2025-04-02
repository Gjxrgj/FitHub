import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {FC, useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {LoginRequest, RootStackParamList} from '../../dto/types.ts';
import {getLoggedInUser, login} from '../../services';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomView} from '../../components/CustomView/CustomView.tsx';
import {CustomTextInput} from '../../components/CustomTextInput/CustomTextInput.tsx';
import {useAuth} from '../../context/AuthProvider.tsx';
import {styles} from './styles.ts';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: FC = () => {
    const [loginForm, setLoginForm] = useState<LoginRequest>({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const {setUser} = useAuth();

    const handleLogin = async () => {
        const trimmedUsername = loginForm.username.trim();
        const trimmedPassword = loginForm.password.trim();

        setLoginForm(prevForm => ({
            ...prevForm,
            username: trimmedUsername,
            password: trimmedPassword,
        }));

        try {
            const loginRequest: LoginRequest = {
                username: trimmedUsername,
                password: trimmedPassword,
            }
            await login(loginRequest)
                .then(token => {
                    AsyncStorage.setItem('authToken', token).then(() => {
                        getLoggedInUser().then(usr => setUser(usr));
                    });
                });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleForgotPassword = () => {
        //TODO: Implement the forgot password logic
    };

    const handleSignUp = () => {
        navigation.navigate('SignUpStep1');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <CustomView>
            <Image
                source={require('../../assets/images/logo-original-transparent.png')}
                style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    marginBottom: 150,
                }}
            />
            <CustomTextInput
                label="Username"
                value={loginForm.username}
                onChangeText={text => setLoginForm(prevForm => ({...prevForm, username: text}))}

            />
            <CustomTextInput
                label="Password"
                value={loginForm.password}
                secureTextEntry={!showPassword}
                onChangeText={text => setLoginForm(prevForm => ({...prevForm, password: text}))}
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
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text
                    style={styles.forgotPasswordText}
                >Forgot Password?</Text>
            </TouchableOpacity>
            <Button style={{
                margin: 10,
                borderRadius: 2
            }} mode="contained" onPress={handleLogin}>
                Login
            </Button>

            <TouchableOpacity onPress={handleSignUp}>
                <Text
                    style={styles.dontHaveAccountText}
                >Don't have an account? <Text style={{color: '#007bff'}}>Sign up</Text></Text>
            </TouchableOpacity>
        </CustomView>
    );
};


