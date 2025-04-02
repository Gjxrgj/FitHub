import {FoodItemDto, UpsertFoodItemDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';


export const getById = async (id: number): Promise<FoodItemDto> => {
    try {
        return apiClient.get<FoodItemDto>(`${config.BACKEND_URL}/api/foodItem/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error getting food item by id:', error);
        throw error;
    }
};
export const addFoodItem = async (upsertFoodItemDto: UpsertFoodItemDto, date: Date): Promise<Array<FoodItemDto>> => {
    try {
        const dayDate = date.toISOString().split('T')[0];
        const response =
            await apiClient.post<Array<FoodItemDto>>(`${config.BACKEND_URL}/api/foodItem/add`, upsertFoodItemDto, {params: {dayDate}});
        return response.data;
    } catch (error) {
        console.error('Error adding new food item:', error);
        throw error;
    }
};

export const createFoodItem = async (upsertFoodItemDto: UpsertFoodItemDto): Promise<FoodItemDto> => {
    try {
        const response =
            await apiClient.post<FoodItemDto>(`${config.BACKEND_URL}/api/foodItem/create`, upsertFoodItemDto);
        return response.data;
    } catch (error) {
        console.error('Error adding new food item:', error);
        throw error;
    }
};

export const getAllUserCreated = async (userId: number): Promise<Array<FoodItemDto>> => {
    try {
        const response =
            await apiClient.get<Array<FoodItemDto>>(`${config.BACKEND_URL}/api/foodItem/userCreated/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding new food item:', error);
        throw error;
    }
};


export const addMultipleFoodItems = async (upsertFoodItems: Array<FoodItemDto>, dayDate: string): Promise<Array<FoodItemDto>> => {
    try {
        const response =
            await apiClient.post<Array<FoodItemDto>>(`${config.BACKEND_URL}/api/foodItem/addMultiple`, upsertFoodItems, {params: {dayDate}});
        return response.data;
    } catch (error) {
        console.error('Error adding multiple food items:', error);
        throw error;
    }
};


export const removeFoodItem = async (id: number): Promise<number> => {
    try {
        const response =
            await apiClient.delete<number>(`${config.BACKEND_URL}/api/foodItem/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error adding new food item:', error);
        throw error;
    }
};
