/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getBanners } from '@/lib/apiServices/Queries'
import { BannerCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useBanners = (params?: GetAllParamsType) => {
  const [banners, setBanners] = useState<BannerCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners(params)
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
