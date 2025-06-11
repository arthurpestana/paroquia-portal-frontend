/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getPriestById } from '@/lib/apiServices/Queries'
import { PriestResponse } from '@/lib/types/QueriesTypes'

export const usePriestById = (id: string) => {
  const [priest, setPriest] = useState<PriestResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPriest = async () => {
      try {
        const data = await getPriestById(id)
        setPriest(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar priest:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPriest()
  }, [])

  return { priest, loading, error }
}
