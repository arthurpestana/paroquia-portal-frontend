import api from '@/services/api'
import { BannerResponse, EventResponse } from '../types/QueriesTypes';
import { GetAllParamsType } from '../types/QueryParamsType';
import { QueryStringfy } from '../utils/stringUtils';

export const getBanners = async (params?: GetAllParamsType): Promise<BannerResponse[]> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/banners${query ? `?${query}` : ''}`);
    return response.data;
};

export const getActiveBanners = async (params?: GetAllParamsType): Promise<BannerResponse[]> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/banners/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getNextEvents = async (params?: GetAllParamsType): Promise<EventResponse[]> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/events/nextEvents${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllEvents = async (params?: GetAllParamsType): Promise<EventResponse[]> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/events${query ? `?${query}` : ''}`);
    return response.data;
}