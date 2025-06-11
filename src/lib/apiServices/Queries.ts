import api from '@/services/api'
import { BannerCountResponse, BannerResponse, EventCountResponse, MassTimeCountResponse, PastoralCountResponse, PriestCountResponse } from '../types/QueriesTypes';
import { GetAllParamsType } from '../types/QueryParamsType';
import { QueryStringfy } from '../utils/stringUtils';

export const getBannerById = async (id: string): Promise<BannerResponse> => {
    const response = await api.get(`/banners/${id}`);
    return response.data;
}

export const getBanners = async (params?: GetAllParamsType): Promise<BannerCountResponse> => {
    console.log('getBanners', params);
    const query = QueryStringfy(params || {});
    console.log('getBanners query', query);

    const response = await api.get(`/banners${query ? `?${query}` : ''}`);
    return response.data;
};

export const getActiveBanners = async (params?: GetAllParamsType): Promise<BannerCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/banners/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getNextEvents = async (params?: GetAllParamsType): Promise<EventCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/events/nextEvents${query ? `?${query}` : ''}`);
    return response.data;
}

export const getActiveEvents = async (params?: GetAllParamsType): Promise<EventCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/events/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllEvents = async (params?: GetAllParamsType): Promise<EventCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/events${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllMassTimes = async (params?: GetAllParamsType): Promise<MassTimeCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/massTimes${query ? `?${query}` : ''}`);
    return response.data;
}

export const getActiveMassTimes = async (params?: GetAllParamsType): Promise<MassTimeCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/massTimes/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getActivePastorals = async (params?: GetAllParamsType): Promise<PastoralCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/pastorals/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllPastorals = async (params?: GetAllParamsType): Promise<PastoralCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/pastorals${query ? `?${query}` : ''}`);
    return response.data;
}

export const getActivePriests = async (params?: GetAllParamsType): Promise<PriestCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/priests/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllPriests = async (params?: GetAllParamsType): Promise<PriestCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/priests${query ? `?${query}` : ''}`);
    return response.data;
}