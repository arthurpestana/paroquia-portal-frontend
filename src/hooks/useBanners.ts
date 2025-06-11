/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { getAllBanners } from '@/lib/apiServices/Queries';
import { BannerCountResponse } from '@/lib/types/QueriesTypes';
import { GetAllParamsType } from '@/lib/types/QueryParamsType';

export const useBanners = (params?: GetAllParamsType) => {
  const [banners, setBanners] = useState<BannerCountResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllBanners(params);
      setBanners(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar banners:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  return { banners, loading, error, refetch: fetchBanners };
};
