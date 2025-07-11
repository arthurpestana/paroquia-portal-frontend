/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getNextEvents } from '@/lib/apiServices/Queries'
import { EventCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useNextEvents = (params?: GetAllParamsType) => {
  const [events, setEvents] = useState<EventCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getNextEvents(params)
        setEvents(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar eventos:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return { events, loading, error }
}
