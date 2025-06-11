/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getBannerById } from '@/lib/apiServices/Queries'
import { BannerResponse } from '@/lib/types/QueriesTypes'

export const useBannerById = (id: string) => {
  const [banner, setBanner] = useState<BannerResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchbanner = async () => {
      try {
        const data = await getBannerById(id)
        setBanner(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar banner:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchbanner()
  }, [])

  return { banner, loading, error }
}
