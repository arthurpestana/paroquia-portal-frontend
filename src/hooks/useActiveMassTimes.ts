/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getActiveMassTimes } from '@/lib/apiServices/Queries'
import { MassTimeCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useActiveMassTimes = (params?: GetAllParamsType) => {
  const [massTimes, setMassTimes] = useState<MassTimeCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getActiveMassTimes(params)
        setMassTimes(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar massTimes:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  return { massTimes, loading, error }
}
