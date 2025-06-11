import {
    ProfessionalTrainerAutocompleteDto,
    ProfessionalTrainerDto,
    UpsertProfessionalTrainerDto
} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const becomeProfessionalTrainer = async (upsertProfessionalTrainer: UpsertProfessionalTrainerDto): Promise<ProfessionalTrainerDto> => {
    try {
        return await apiClient.post<ProfessionalTrainerDto>(`${config.BACKEND_URL}/api/professional_trainer/enroll`, upsertProfessionalTrainer)
            .then(response => response.data);
    } catch (error) {
        console.error('Error fetching professional trainers by id:', error);
        throw error;
    }
};

export const getProfessionalTrainerById = async (id: number): Promise<ProfessionalTrainerDto> => {
    try {
        return await apiClient.get<Array<ProfessionalTrainerAutocompleteDto>>(`${config.BACKEND_URL}/api/professional_trainer/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error fetching professional trainers by id:', error);
        throw error;
    }
};

export const getProfessionalTrainerByQuery = async (query: string): Promise<Array<ProfessionalTrainerAutocompleteDto>> => {
    try {
        return await apiClient.get<Array<ProfessionalTrainerAutocompleteDto>>(`${config.BACKEND_URL}/api/professional_trainer/getByQuery`, {
            params: {
                query,
            },
        }).then(response => response.data);
    } catch (error) {
        console.error('Error fetching professional trainers by query:', error);
        throw error;
    }
};
