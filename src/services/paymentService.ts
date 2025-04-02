import {ResubscribeRequest, SubscriptionRequest} from "../dto/types";
import {config} from "../config/config";
import apiClient from "../util/apiClient";

export const subscribe = async (request: SubscriptionRequest) => {
    try {
        return apiClient
            .post(`${config.BACKEND_URL}/api/payments/create-subscription`, request)
            .then(response => response.data);
    } catch (error) {
        console.error('Subscription error:', error);
        throw error;
    }
};

export const resubscribe = async (request: ResubscribeRequest) => {
    try {
        return apiClient
            .post(`${config.BACKEND_URL}/api/payments/resubscribe`, request)
            .then(response => response.data);
    } catch (error) {
        console.error('Resubscribe error:', error);
        throw error;
    }
};

export const updateSubscription = async (venueId: number) => {
    try {
        return apiClient
            .post(`${config.BACKEND_URL}/api/payments/update-subscription/${venueId}`)
            .then(response => response.data);
    } catch (error) {
        console.error('Update subscription error:', error);
        throw error;
    }
};
