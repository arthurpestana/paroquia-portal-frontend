/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { getAllImages } from '@/lib/apiServices/Queries'
import { ImageCountResponse } from '@/lib/types/QueriesTypes'
import { GetAllParamsType } from '@/lib/types/QueryParamsType'

export const useImages = (params?: GetAllParamsType) => {
  const [images, setImages] = useState<ImageCountResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllImages(params);
      setImages(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar images:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return { images, loading, error, refetch: fetchImages }
}
