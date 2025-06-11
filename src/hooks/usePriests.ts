/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { getAllPriests } from '@/lib/apiServices/Queries'
import { PriestCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const usePriests = (params?: GetAllParamsType) => {
  const [priests, setPriests] = useState<PriestCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPriests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllPriests(params);
      setPriests(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar priests:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchPriests();
  }, [fetchPriests]);

  return { priests, loading, error, refetch: fetchPriests }
}
