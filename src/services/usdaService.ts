import axios from 'axios';
import {USDASearch} from '../dto/types.ts';
import Constants from 'expo-constants';

export const searchUsdaFoods = async (searchTerm: string): Promise<USDASearch> => {
    try {
        return await axios.get<USDASearch>('https://api.nal.usda.gov/fdc/v1/foods/search', {
            params: {
                query: searchTerm,
                api_key: Constants.expoConfig.extra.USDA_API_KEY,
            },
        }).then(response => response.data);
    } catch (error) {
        console.error('Error searching foods:', error);
        return {} as USDASearch;
    }
};
