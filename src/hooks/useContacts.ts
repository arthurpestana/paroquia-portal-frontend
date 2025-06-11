/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { getAllContacts } from '@/lib/apiServices/Queries';
import { ContactCountResponse } from '@/lib/types/QueriesTypes';
import { GetAllParamsType } from '@/lib/types/QueryParamsType';

export const useContacts = (params?: GetAllParamsType) => {
  const [contacts, setContacts] = useState<ContactCountResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllContacts(params);
      setContacts(data);
      setError(null);
    } catch (err: Error | any) {
      console.error('Erro ao buscar contacts:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return { contacts, loading, error, refetch: fetchContacts };
};
