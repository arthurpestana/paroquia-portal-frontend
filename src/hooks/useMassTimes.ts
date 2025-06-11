/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { getAllMassTimes } from '@/lib/apiServices/Queries';
import { MassTimeCountResponse } from '@/lib/types/QueriesTypes';
import { GetAllParamsType } from '@/lib/types/QueryParamsType';

export const useMassTimes = (params?: GetAllParamsType) => {
  const [massTimes, setMassTimes] = useState<MassTimeCountResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMassTimes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllMassTimes(params);
      setMassTimes(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar massTimes:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchMassTimes();
  }, [fetchMassTimes]);

  return { massTimes, loading, error, refetch: fetchMassTimes };
};
