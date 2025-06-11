import { useSearchParams } from 'next/navigation';

export const useUrlFilters = <T = Record<string, unknown>>(key: string = 'filter'): T => {
  const searchParams = useSearchParams();
  const raw = searchParams.get(key);

  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return typeof parsed === 'object' && parsed !== null ? parsed : {} as T;
  } catch {
    console.warn('Invalid filter in URL:', raw);
    return {} as T;
  }
};
