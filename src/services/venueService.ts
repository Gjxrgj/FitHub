import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';
import {VenueType} from '../enums/enums.ts';
import {
    ContactInformationDto,
    FitnessRestaurantDto,
    FitnessShopDto,
    GymDto,
    ImageDto,
    LocationInformationDto,
    UpsertImageDto
} from '../dto/types.ts';

export const getVenuesForUser = async (userId: number):
    Promise<Record<VenueType, Array<GymDto> | Array<FitnessShopDto> | Array<FitnessRestaurantDto>>> => {
    try {
        const response =
            await apiClient.get<Record<VenueType, Array<GymDto> | Array<FitnessShopDto> | Array<FitnessRestaurantDto>>>(
                `${config.BACKEND_URL}/api/venue/getAllForUser/${userId}`
            );
        return response.data;
    } catch (error) {
        console.error(`Error venue with user id ${userId}:`, error);
        throw error;
    }
};

export const addImageToVenue = async (upsertImageDto: UpsertImageDto, id: number): Promise<Array<ImageDto>> => {
    try {
        return await apiClient.post<Array<ImageDto>>(`${config.BACKEND_URL}/api/venue/addImage/${id}`, upsertImageDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot add image to venue with id ${id}:`, error);
        throw error;
    }
};


export const removeImageFromVenue = async (id: number):
    Promise<Array<ImageDto>> => {
    try {
        return await apiClient.delete<Array<ImageDto>>(`${config.BACKEND_URL}/api/venue/removeImage/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot remove image from venue with id ${id}:`, error);
        throw error;
    }
};

export const updateAvatar = async (id: number, avatar: string): Promise<string> => {
    try {
        return await apiClient.post<string>(`${config.BACKEND_URL}/api/venue/updateAvatar/${id}`, avatar, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update avatar:`, error);
        throw error;
    }
};

export const editDescription = async (id: number, description: string): Promise<string> => {
    try {
        return await apiClient.post<string>(`${config.BACKEND_URL}/api/venue/editDescription/${id}`, description, {
            headers: {
                'Content-Type': 'text/plain',
            },
        })
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update description:`, error);
        throw error;
    }
};

export const editContactInformation = async (id: number, contactInformation: ContactInformationDto): Promise<ContactInformationDto> => {
    try {
        return await apiClient.post<ContactInformationDto>(`${config.BACKEND_URL}/api/venue/updateContactInformation/${id}`, contactInformation)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update description:`, error);
        throw error;
    }
};

export const editLocationInformation = async (id: number, locationInformationDto: LocationInformationDto): Promise<LocationInformationDto> => {
    try {
        return await apiClient.post<LocationInformationDto>(`${config.BACKEND_URL}/api/venue/updateLocation/${id}`, locationInformationDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update location:`, error);
        throw error;
    }
};
