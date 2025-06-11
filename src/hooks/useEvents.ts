/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { getAllEvents } from '@/lib/apiServices/Queries'
import { EventCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useEvents = (params?: GetAllParamsType) => {
  const [events, setEvents] = useState<EventCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEvents(params);
      setEvents(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar events:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents }
}
