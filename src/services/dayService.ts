import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const calorieIntakeForDay = async (date: Date): Promise<number> => {
    try {
        const dayDate = date.toISOString().split('T')[0];
        const response =
            await apiClient.get<number>(`${config.BACKEND_URL}/api/day/calorieIntakeForDay`, {params: {dayDate}});
        return response.data;
    } catch (error) {
        console.error('Error getting calories for current day item:', error);
        throw error;
    }
};
