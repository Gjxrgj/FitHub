import {
    AddGymRequest,
    GroupTrainingDto,
    GymDto,
    PersonalTrainingDto,
    PricingDto,
    PromotionDto,
    UpsertGroupTrainingDto,
    UpsertPersonalTrainingDto,
    UpsertPromotionDto,
} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const addGym = async (gymRequest: AddGymRequest): Promise<GymDto> => {
    try {
        const response =
            await apiClient.post<GymDto>(`${config.BACKEND_URL}/api/gym/add`, gymRequest);
        return response.data;
    } catch (error) {
        console.error('Error adding new gym: ', error);
        throw error;
    }
};

export const getGymById = async (gymId: number): Promise<GymDto> => {
    try {
        return await apiClient.get<GymDto>(`${config.BACKEND_URL}/api/gym/${gymId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error gym with id ${gymId}:`, error);
        throw error;
    }
};

export const fetchNearbyGyms = async (latitude: number, longitude: number): Promise<Array<GymDto>> => {
    try {
        return await apiClient.get<Array<GymDto>>(`${config.BACKEND_URL}/api/gym/all`, {
            params: {
                latitude,
                longitude,
            },
        }).then(response => response.data);
    } catch (error) {
        console.error('Error fetching nearby gyms:', error);
        throw error;
    }
};

export const addPromotionToGym = async (id: number, upsertPromotionDto: UpsertPromotionDto): Promise<Array<PromotionDto>> => {
    try {
        return await apiClient.post<Array<PromotionDto>>(`${config.BACKEND_URL}/api/gym/addPromotion/${id}`, upsertPromotionDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error adding promotion to gym with id ${id}`, error);
        throw error;
    }
};

export const removePromotionFromGym = async (id: number): Promise<Array<PromotionDto>> => {
    try {
        return await apiClient.delete<Array<PromotionDto>>(`${config.BACKEND_URL}/api/gym/removePromotion/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error removing promotion from gym with id ${id}`, error);
        throw error;
    }
};

export const addGroupTrainingToGym = async (id: number, upsertGroupTrainingDto: UpsertGroupTrainingDto): Promise<Array<GroupTrainingDto>> => {
    try {
        return await apiClient.post<Array<GroupTrainingDto>>(`${config.BACKEND_URL}/api/gym/addGroupTraining/${id}`, upsertGroupTrainingDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error adding group training to gym with id ${id}`, error);
        throw error;
    }
};

export const removeGroupTrainingFromGym = async (id: number): Promise<Array<GroupTrainingDto>> => {
    try {
        return await apiClient.delete<Array<GroupTrainingDto>>(`${config.BACKEND_URL}/api/gym/removeGroupTraining/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error removing group training from gym with id ${id}`, error);
        throw error;
    }
};


export const addPersonalTraining = async (id: number, upsertGroupTrainingDto: UpsertPersonalTrainingDto): Promise<Array<PersonalTrainingDto>> => {
    try {
        return await apiClient.post<Array<PersonalTrainingDto>>(`${config.BACKEND_URL}/api/gym/addPersonalTraining/${id}`, upsertGroupTrainingDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error adding personal training to gym with id ${id}`, error);
        throw error;
    }
};

export const removePersonalTraining = async (id: number): Promise<Array<PersonalTrainingDto>> => {
    try {
        return await apiClient.delete<Array<PersonalTrainingDto>>(`${config.BACKEND_URL}/api/gym/removePersonalTraining/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error removing ptraining from gym with id ${id}`, error);
        throw error;
    }
};

export const editPricing = async (id: number, pricingDto: PricingDto): Promise<PricingDto> => {
    try {
        return await apiClient.post<PricingDto>(`${config.BACKEND_URL}/api/gym/updatePricing/${id}`, pricingDto)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error updating pricing for gym with id ${id}`, error);
        throw error;
    }
};
