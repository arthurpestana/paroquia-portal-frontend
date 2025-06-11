/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getImageById } from '@/lib/apiServices/Queries'
import { ImageResponse } from '@/lib/types/QueriesTypes'

export const useImageById = (id: string) => {
  const [image, setImage] = useState<ImageResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const data = await getImageById(id)
        setImage(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar image:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [])

  return { image, loading, error }
}
