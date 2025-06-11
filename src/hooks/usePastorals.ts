/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { getAllPastorals } from '@/lib/apiServices/Queries';
import { PastoralCountResponse } from '@/lib/types/QueriesTypes';
import { GetAllParamsType } from '@/lib/types/QueryParamsType';

export const usePastorals = (params?: GetAllParamsType) => {
  const [pastorals, setPastorals] = useState<PastoralCountResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPastorals = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPastorals(params);
      setPastorals(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar pastorals:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchPastorals();
  }, [fetchPastorals]);

  return { pastorals, loading, error, refetch: fetchPastorals };
};
