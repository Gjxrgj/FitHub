import {LoginRequest, UpsertUserDto, UserDto} from '../dto/types.ts';
import {config} from '../config/config.ts';
import axios from 'axios';
import apiClient from "../util/apiClient";


export const login = async (loginRequest: LoginRequest): Promise<string> => {
    try {
        return axios
            .post<string>(`${config.BACKEND_URL}/api/auth/login`, loginRequest)
            .then((response) => {
                return response.data;
            });
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (userDto: UpsertUserDto): Promise<UserDto> => {
    try {
        return axios
            .post<UserDto>(`${config.BACKEND_URL}/api/auth/register`, userDto)
            .then(response => response.data);
    } catch (error) {s
        console.error('Login error:', error);
        throw error;
    }
};

export const usernameAlreadyExists = async (username: string): Promise<boolean> => {
    try {
        return await apiClient.get<boolean>(`${config.BACKEND_URL}/api/auth/username_exists`, {
            params: {
                username,
            },
        }).then(response => response.data)
    } catch (error) {
        console.error('Checking if user by username exists error:', error);
        throw error;
    }
};

export const emailAlreadyExists = async (email: string): Promise<boolean> => {
    try {
        const response = await apiClient
            .get<boolean>(`${config.BACKEND_URL}/api/auth/email_exists`, {
                params: {
                    email
                }
            });
        return response.data;
    } catch (error) {
        console.error('Checking if user by email exists error:', error);
        throw error;
    }
};
