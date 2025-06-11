/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getPastoralById } from '@/lib/apiServices/Queries'
import { PastoralResponse } from '@/lib/types/QueriesTypes'

export const usePastoralById = (id: string) => {
  const [pastoral, setPastoral] = useState<PastoralResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPastoral = async () => {
      try {
        const data = await getPastoralById(id)
        setPastoral(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar pastoral:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPastoral()
  }, [])

  return { pastoral, loading, error }
}
