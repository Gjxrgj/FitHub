import {ExerciseDto, UpsertExerciseDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';
import {ExerciseCategory} from '../enums/enums.ts';

export const getExercisesByNameAndCategory = async (search: string, category: ExerciseCategory | undefined): Promise<Array<ExerciseDto>> => {
    try {
        return await apiClient.get<Array<ExerciseDto>>(`${config.BACKEND_URL}/api/exercises`, {
            params: {
                search,
                category,
            },
        }).then(response => response.data);
    } catch (error) {
        console.error('Error fetching exercises by name and category:', error);
        throw error;
    }
};

export const getRecentExercises = async (userId: number): Promise<Array<ExerciseDto>> => {
    try {
        return await apiClient.get<Array<ExerciseDto>>(`${config.BACKEND_URL}/api/exercises/recent/${userId}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error fetching recent exercises:', error);
        throw error;
    }
};

export const getAllCreatedByUser = async (userId: number): Promise<Array<ExerciseDto>> => {
    try {
        return await apiClient.get<Array<ExerciseDto>>(`${config.BACKEND_URL}/api/exercises/all/${userId}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error fetching recent exercises:', error);
        throw error;
    }
};

export const createExercise = async (upsertExerciseDto: UpsertExerciseDto): Promise<ExerciseDto> => {
    try {
        return await apiClient.post<ExerciseDto>(`${config.BACKEND_URL}/api/exercises/add`, upsertExerciseDto)
            .then(response => response.data);
    } catch (error) {
        console.error('Error creating new exercise:', error);
        throw error;
    }
};
