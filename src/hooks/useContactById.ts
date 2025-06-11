/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { getContactById } from '@/lib/apiServices/Queries'
import { ContactResponse } from '@/lib/types/QueriesTypes'

export const useContactById = (id: string) => {
  const [contact, setContact] = useState<ContactResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactById(id)
        setContact(data)
      } catch (err: Error | any) {
        console.error('Erro ao buscar contact:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchContact()
  }, [])

  return { contact, loading, error }
}
