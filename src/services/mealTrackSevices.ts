import {MealTrackDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const getMealById = async (id: number): Promise<MealTrackDto> => {
    try {
        return await apiClient.get<MealTrackDto>(`${config.BACKEND_URL}/api/mealTrack/${id}`,
        ).then(response => response.data);
    } catch (error) {
        console.error(`Error fetching meal track with id: ${id}`, error);
        throw error;
    }
};


export const fetchRecentMealTracks = async (userId: number): Promise<Array<MealTrackDto>> => {
    try {
        return await apiClient.get<Array<MealTrackDto>>(`${config.BACKEND_URL}/api/mealTrack/getRecentMeals/${userId}`,
        ).then(response => response.data);
    } catch (error) {
        console.error('Error fetching recent meal tracks', error);
        throw error;
    }
};
