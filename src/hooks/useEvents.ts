/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getAllEvents } from '@/lib/apiServices/Queries'
import { EventResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useEvents = (params?: GetAllParamsType) => {
  const [events, setEvents] = useState<EventResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const data = await getAllEvents(params)
        setEvents(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar eventos:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchevents()
  }, [])

  return { events, loading, error }
}
