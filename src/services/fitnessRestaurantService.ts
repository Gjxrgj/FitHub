import {
    AddFitnessRestaurantRequest,
    FitnessRestaurantDto,
    MenuDto,
    SubscriptionResponse,
    UpsertMealDto
} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const addFitnessRestaurant = async (fitnessRestaurantRequest: AddFitnessRestaurantRequest): Promise<FitnessRestaurantDto> => {
    try {
        const response =
            await apiClient.post<FitnessRestaurantDto>(`${config.BACKEND_URL}/api/fitness_restaurant/add`, fitnessRestaurantRequest);
        return response.data;
    } catch (error) {
        console.error('Error adding new restaurant:', error);
        throw error;
    }
};

export const fetchNearbyRestaurants = async (latitude: number, longitude: number): Promise<Array<FitnessRestaurantDto>> => {
    try {
        const response = await apiClient.get<Array<FitnessRestaurantDto>>(`${config.BACKEND_URL}/api/fitness_restaurant/all`, {
            params: {
                latitude,
                longitude,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nearby gyms:', error);
        throw error;
    }
};

export const getFitnessRestaurantById = async (id: number): Promise<FitnessRestaurantDto> => {
    try {
        return await apiClient.get<FitnessRestaurantDto>(`${config.BACKEND_URL}/api/fitness_restaurant/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error fetching nearby gyms:', error);
        throw error;
    }
};

export const addMeal = async (id: number, upsertMealDto: UpsertMealDto): Promise<MenuDto> => {
    try {
        return await apiClient.post<MenuDto>(`${config.BACKEND_URL}/api/fitness_restaurant/addMeal/${id}`, upsertMealDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error adding new meal to restaurant with id ${id}:`, error);
        throw error;
    }
};

export const removeMeal = async (id: number): Promise<MenuDto> => {
    try {
        return await apiClient.delete<MenuDto>(`${config.BACKEND_URL}/api/fitness_restaurant/removeMeal/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error removing meal from restaurant with id ${id}:`, error);
        throw error;
    }
};

