import {ReviewDto, UpsertReviewDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const getAllReviewsForVenue = async (venueId: number): Promise<Array<ReviewDto>> => {
    try {
        return await apiClient.get<Array<ReviewDto>>(
            `${config.BACKEND_URL}/api/review/getAllForVenue/${venueId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error getting reviews for venue with id ${venueId}:`, error);
        throw error;
    }
};

export const addReviewToVenue = async (upsertReview: UpsertReviewDto, venueId: number): Promise<ReviewDto> => {
    try {
        return await apiClient.post<ReviewDto>(`${config.BACKEND_URL}/api/review/addReview/${venueId}`, upsertReview)
            .then(response => response.data);
    } catch (error) {
        console.error(`Cannot add review to venue with id: ${venueId}:`, error);
        throw error;
    }
};

export const deleteReview = async (id: number): Promise<number> => {
    try {
        return await apiClient.delete<number>(`${config.BACKEND_URL}/api/review/delete/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Cannot delete review with id: ${id}:`, error);
        throw error;
    }
};

