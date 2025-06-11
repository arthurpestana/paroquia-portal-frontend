/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getMassTimeById } from '@/lib/apiServices/Queries'
import { MassTimeResponse } from '@/lib/types/QueriesTypes'

export const useMassTimeById = (id: string) => {
  const [massTime, setMassTime] = useState<MassTimeResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMassTime = async () => {
      try {
        const data = await getMassTimeById(id)
        setMassTime(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar massTime:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMassTime()
  }, [])

  return { massTime, loading, error }
}
