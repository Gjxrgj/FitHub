import {ExerciseInWorkoutDto, UpsertExerciseInWorkoutDto, WorkoutDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const addExerciseInWorkout = async (upsertExerciseInWorkoutDto: UpsertExerciseInWorkoutDto): Promise<ExerciseInWorkoutDto> => {
    try {
        return await apiClient.post<ExerciseInWorkoutDto>(`${config.BACKEND_URL}/api/exerciseInWorkout/add`, upsertExerciseInWorkoutDto)
            .then(response => response.data);
    } catch (error) {
        console.error('Error adding exercise to workout:', error);
        throw error;
    }
};

export const addMultipleExercisesInWorkout = async (exercises: Array<UpsertExerciseInWorkoutDto>): Promise<WorkoutDto> => {
    try {
        return await apiClient.post<WorkoutDto>(`${config.BACKEND_URL}/api/exerciseInWorkout/addMultiple`, exercises)
            .then(response => response.data);
    } catch (error) {
        console.error('Error adding multiple exercise to workout:', error);
        throw error;
    }
};

export const editMultiple = async (exercises: Array<ExerciseInWorkoutDto>): Promise<WorkoutDto> => {
    try {
        return await apiClient.put<WorkoutDto>(`${config.BACKEND_URL}/api/exerciseInWorkout/editMultiple`, exercises)
            .then(response => response.data);
    } catch (error) {
        console.error('Error editing multiple exercises:', error);
        throw error;
    }
};


export const removeExerciseFromWorkout = async (exerciseId: number): Promise<number> => {
    try {
        return await apiClient.delete<number>(`${config.BACKEND_URL}/api/exerciseInWorkout/${exerciseId}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error removing exercise from workout:', error);
        throw error;
    }
};
