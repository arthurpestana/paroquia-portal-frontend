import api from '@/services/api'
import { BannerType } from '../types/QueriesTypes';

export const getBanners = async (): Promise<BannerType[]> => {
  const response = await api.get('/banners');
  return response.data;
}

export const fetchBanners = async () => {
  return await getBanners()
}