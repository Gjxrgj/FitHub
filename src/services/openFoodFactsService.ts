import {OFFFoodItemDto} from '../dto/types.ts';
import axios from 'axios';
import {concatFields} from '../util/stringUtil.ts';

export const getFoodByQR = async (qr: string, fields: Array<string>): Promise<OFFFoodItemDto> => {
    const fieldsString = concatFields(fields);
    try {
        return axios.get<OFFFoodItemDto>(`https://world.openfoodfacts.org/api/v2/product/${qr}?fields=${fieldsString}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Error adding new fitness shop :', error);
        throw error;
    }
};
