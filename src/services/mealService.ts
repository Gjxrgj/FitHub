import {MealTrackDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const getMealsForDay = async (userId: number, dayDate: string): Promise<Array<MealTrackDto>> => {
    try {
        const response =
            await apiClient.get<Array<MealTrackDto>>(`${config.BACKEND_URL}/api/mealTrack/getAllForDay/${userId}`, {params: {dayDate}});
        return response.data;
    } catch (error) {
        console.error(`Error getting mealsTracks for day ${dayDate}:`, error);
        throw error;
    }
};
``
