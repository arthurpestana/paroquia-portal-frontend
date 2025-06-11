import api from '@/services/api'
import { BannerCountResponse, BannerResponse, ContactCountResponse, ContactResponse, EventCountResponse, MassTimeCountResponse, PastoralCountResponse, PriestCountResponse, EventResponse, ImageCountResponse, ImageResponse, MassTimeResponse, PastoralResponse, PriestResponse, } from '../types/QueriesTypes';
import { GetAllParamsType } from '../types/QueryParamsType';
import { QueryStringfy } from '../utils/stringUtils';

export const getBannerById = async (id: string): Promise<BannerResponse> => {
    const response = await api.get(`/banners/${id}`);
    return response.data;
}

export const getAllBanners = async (params?: GetAllParamsType): Promise<BannerCountResponse> => {
    const query = QueryStringfy(params || {});

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

export const getEventById = async (id: string): Promise<EventResponse> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
}

export const getMassTimeById = async (id: string): Promise<MassTimeResponse> => {
    const response = await api.get(`/massTimes/${id}`);
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

export const getPastoralById = async (id: string): Promise<PastoralResponse> => {
    const response = await api.get(`/pastorals/${id}`);
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

export const getPriestById = async (id: string): Promise<PriestResponse> => {
    const response = await api.get(`/priests/${id}`);
    return response.data;
}

export const getActiveContacts = async (params?: GetAllParamsType): Promise<ContactCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/contacts/active${query ? `?${query}` : ''}`);
    return response.data;
}

export const getAllContacts = async (params?: GetAllParamsType): Promise<ContactCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/contacts${query ? `?${query}` : ''}`);
    return response.data;
}

export const getContactById = async (id: string): Promise<ContactResponse> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
}

export const getImageById = async (id: string): Promise<ImageResponse> => {
    const response = await api.get(`/images/${id}`);
    return response.data;
}

export const getAllImages = async (params?: GetAllParamsType): Promise<ImageCountResponse> => {
    const query = QueryStringfy(params || {});

    const response = await api.get(`/images${query ? `?${query}` : ''}`);
    return response.data;
}