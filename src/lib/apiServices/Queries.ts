import api from '@/services/api'
import { BannerResponse } from '../types/QueriesTypes';

export const getBanners = async (): Promise<BannerResponse[]> => {
  const response = await api.get('/banners');
  return response.data;
}

export const getActiveBanners = async (): Promise<BannerResponse[]> => {
  const response = await api.get('/banners/active');
  return response.data;
}