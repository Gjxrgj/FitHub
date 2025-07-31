import {AddFitnessShopRequest, FitnessShopDto, SubscriptionResponse} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';


export const addFitnessShop = async (shopRequest: AddFitnessShopRequest): Promise<FitnessShopDto> => {
    try {
        const response =
            await apiClient.post<FitnessShopDto>(`${config.BACKEND_URL}/api/fitness_shop/add`, shopRequest);
        return response.data;
    } catch (error) {
        console.error('Error adding new fitness shop :', error);
        throw error;
    }
};
export const fetchNearbyShops = async (latitude: number, longitude: number): Promise<Array<FitnessShopDto>> => {
    try {
        const response = await apiClient.get<Array<FitnessShopDto>>(`${config.BACKEND_URL}/api/fitness_shop/all`, {
            params: {
                latitude,
                longitude,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching nearby shops:', error);
        throw error;
    }
};


export const getShopById = async (id: number): Promise<FitnessShopDto> => {
    try {
        return await apiClient.get<FitnessShopDto>(`${config.BACKEND_URL}/api/fitness_shop/${id}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error fetching gym by id ${id}: `, error);
        throw error;
    }
};
