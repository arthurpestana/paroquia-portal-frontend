/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getActiveBanners } from '@/lib/apiServices/Queries'
import { BannerResponse } from '@/lib/types/QueriesTypes'

export const useActiveBanners = () => {
  const [banners, setBanners] = useState<BannerResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getActiveBanners()
        setBanners(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar banners:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  return { banners, loading, error }
}
