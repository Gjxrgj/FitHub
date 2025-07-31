import {MealTrackDto, UpsertWorkoutDto, WorkoutDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';


export const getWorkoutById = async (id: number): Promise<WorkoutDto> => {
    try {
        console.log(id)
        return await apiClient.get<WorkoutDto>(`${config.BACKEND_URL}/api/workout/${id}`,
        ).then(response => response.data);
    } catch (error) {
        console.error(`Error workout with id: ${id}`, error);
        throw error;
    }
};

export const getWorkoutsByNameOrDate = async (userId: number, date?: string, workoutName?: string): Promise<Array<WorkoutDto>> => {
    try {
        return apiClient.get<Array<WorkoutDto>>(`${config.BACKEND_URL}/api/workout/getByDateOrName/${userId}`, {
            params: {
                date: date || undefined,
                workoutName: workoutName || undefined,
            },
        })
            .then(response => response.data);
    } catch (error) {
        console.error(`Error getting workouts for day ${date}:`, error);
        throw error;
    }
};

export const addWorkout = async (userId: number, upsertWorkoutDto: UpsertWorkoutDto): Promise<Array<WorkoutDto>> => {
    try {
        return apiClient.post<Array<WorkoutDto>>(`${config.BACKEND_URL}/api/workout/add/${userId}`, upsertWorkoutDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error adding a workout for user with id ${userId}:`, error);
        throw error;
    }
};

export const deleteWorkout = async (workoutId: number): Promise<number> => {
    try {
        return apiClient.delete<number>(`${config.BACKEND_URL}/api/workout/${workoutId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error removing workout with id ${workoutId}:`, error);
        throw error;
    }
};
