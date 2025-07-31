import {UpdatePersonalInfoDto, UserDto} from '../dto/types.ts';
import {config} from '../config/config.ts';
import apiClient from '../util/apiClient.ts';

export const getLoggedInUser = async (): Promise<UserDto> => {
    try {
        const response = await apiClient
            .get<UserDto>(`${config.BACKEND_URL}/api/users/get_logged_user`);
        return response.data;
    } catch (error) {
        console.error('Error fetching logged in user:', error);
        throw error;
    }
};


export const getUserById = async (id: number): Promise<UserDto> => {
    try {
        const response = await apiClient
            .get<UserDto>(`${config.BACKEND_URL}/api/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
};

export const getUsersByUsername = async (username: string): Promise<Array<UserDto>> => {
    try {
        const response = await apiClient
            .get<Array<UserDto>>(`${config.BACKEND_URL}/api/users/findFriends`, {
                params: {
                    username
                }
            });
        return response.data;
    } catch (error) {
        console.error('Error getting users with search term:' + username, error);
        throw error;
    }
};

export const disableUser = async (id: number): Promise<number> => {
    try {
        const response = await apiClient
            .delete<number>(`${config.BACKEND_URL}/api/users/disable/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error disabling user:', error);
        throw error;
    }
};

export const getFollowersForUser = async (userId: number): Promise<Array<UserDto>> => {
    try {
        const response = await apiClient
            .get<Array<UserDto>>(`${config.BACKEND_URL}/api/users/getFollowersForUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting followers for user:', error);
        throw error;
    }
};


export const getFollowingForUser = async (userId: number): Promise<Array<UserDto>> => {
    try {
        const response = await apiClient
            .get<Array<UserDto>>(`${config.BACKEND_URL}/api/users/getFollowingForUser/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting following for user:', error);
        throw error;
    }
};

export const linkProfessionalTrainerToUser = async (userId: number, professionalTrainerId: number): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/professionalTrainer/${userId}`, {professionalTrainerId})
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update avatar:`, error);
        throw error;
    }
};


export const updateUserAvatar = async (userId: number, avatarData: string): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/updateAvatar/${userId}`, avatarData, {
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

export const updateUsersBio = async (userId: number, bio: string): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/updateBio/${userId}`, bio, {
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

export const followUser = async (userId: number): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/follow/${userId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error follow user with id: ${userId}`, error);
        throw error;
    }
};

export const unfollowUser = async (userId: number): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/unfollow/${userId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error unfollow user with id: ${userId}`, error);
        throw error;
    }
};

export const updatePersonalInfo = async (userId: number, updatedPersonalInfo: UpdatePersonalInfoDto): Promise<UserDto> => {
    try {
        return await apiClient.put<UserDto>(`${config.BACKEND_URL}/api/users/updatePersonalInfo/${userId}`, updatedPersonalInfo)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error cannot update avatar:`, error);
        throw error;
    }
};



