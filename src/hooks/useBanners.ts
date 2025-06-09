/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getBanners } from '@/lib/apiServices/Queries'
import { BannerType } from '@/lib/types/QueriesTypes'

export const useBanners = () => {
  const [banners, setBanners] = useState<BannerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners()
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
