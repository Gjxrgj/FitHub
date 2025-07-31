import {PostDto, UpsertCommentDto, UpsertPostDto} from '../dto/types.ts';
import apiClient from '../util/apiClient.ts';
import {config} from '../config/config.ts';

export const getPostById = async (postId: number): Promise<PostDto> => {
    try {
        return await apiClient.get<PostDto>(`${config.BACKEND_URL}/api/post/postById/${postId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error getting post with id ${postId}:`, error);
        throw error;
    }
};

export const deleteComment = async (commentId: number): Promise<PostDto> => {
    try {
        return await apiClient.put<PostDto>(`${config.BACKEND_URL}/api/post/removeComment/${commentId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error deleting comment with id ${commentId}:`, error);
        throw error;
    }
};

export const deletePost = async (postId: number): Promise<number> => {
    try {
        return await apiClient.delete<number>(`${config.BACKEND_URL}/api/post/${postId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error deleting post with id ${postId}:`, error);
        throw error;
    }
};

export const getPostsForUsersFeed = async (userId: number, page: number, size: number): Promise<Array<PostDto>> => {
    try {
        return await apiClient.get<Array<PostDto>>(`${config.BACKEND_URL}/api/post/getForUsersFeed/${userId}`, {
            params: {
                page,
                size,
            },
        }).then(response => response.data);
    } catch (error) {
        console.error(`Error getting posts for users feed with id ${userId}:`, error);
        throw error;
    }
};

export const getPostsForUser = async (userId: number): Promise<Array<PostDto>> => {
    try {
        return await apiClient.get<Array<PostDto>>(`${config.BACKEND_URL}/api/post/${userId}`)
            .then(response => response.data);
    } catch (error) {
        console.error(`Error getting posts for user with id ${userId}:`, error);
        throw error;
    }
};


export const addPost = async (upsertPostDto: UpsertPostDto): Promise<PostDto> => {
    try {
        return await apiClient.post<PostDto>(`${config.BACKEND_URL}/api/post/add`, upsertPostDto).then(response => response.data);
    } catch (error) {
        console.error('Error adding post:', error);
        throw error;
    }
};

export const editPost = async (id: number, upsertPostDto: UpsertPostDto): Promise<PostDto> => {
    try {
        return await apiClient.put<PostDto>(`${config.BACKEND_URL}/api/post/edit/${id}`, upsertPostDto)
            .then(response => response.data);
    } catch (error) {
        console.error('Error editing post:', error);
        throw error;
    }
};


export const likePost = async (postId: number, userId: number): Promise<PostDto> => {
    try {
        return await apiClient.put<PostDto>(`${config.BACKEND_URL}/api/post/likePost`, null, {
            params: {postId, userId}
        }).then(response => response.data);
    } catch (error) {
        console.error('Error liking post:', error);
        throw error;
    }
};


export const unlikePost = async (postId: number, userId: number): Promise<PostDto> => {
    try {
        return await apiClient.put<PostDto>(`${config.BACKEND_URL}/api/post/unlikePost`, null, {
            params: {postId, userId},
        }).then(response => response.data);
    } catch (error) {
        console.error('Error unliking post:', error);
        throw error;
    }
};

export const commentOnPost = async (postId: number, upsertCommentDto: UpsertCommentDto): Promise<PostDto> => {
    try {
        return await apiClient.put<PostDto>(`${config.BACKEND_URL}/api/post/addComment/${postId}`, upsertCommentDto)
            .then(response => response.data);
    } catch (error) {
        console.error('Error adding comment on post:', error);
        throw error;
    }
};
