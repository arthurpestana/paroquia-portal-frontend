/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getEventById } from '@/lib/apiServices/Queries'
import { EventResponse } from '@/lib/types/QueriesTypes'

export const useEventById = (id: string) => {
  const [event, setEvent] = useState<EventResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id)
        setEvent(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar event:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [])

  return { event, loading, error }
}
