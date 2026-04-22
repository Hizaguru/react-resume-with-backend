import {useCallback, useEffect, useState} from 'react';

import {client} from '../client';
import {PortfolioItem} from '../data/dataDef';

interface UsePortfolioItemsResult {
  data: PortfolioItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const sortPortfolioItems = (items: PortfolioItem[]): PortfolioItem[] =>
  [...items].sort(
    (a, b) => new Date(b._updatedAt).getTime() - new Date(a._updatedAt).getTime(),
  );

const usePortfolioItems = (): UsePortfolioItemsResult => {
  const [data, setData] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    client
      .fetch<PortfolioItem[]>('*[_type == "portfolioItems"] | order(_updatedAt desc)')
      .then(result => {
        if (cancelled) return;
        setData(sortPortfolioItems(result));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Failed to load portfolio items'));
      })
      .finally(() => {
        if (cancelled) return;
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const refetch = useCallback(() => setNonce(n => n + 1), []);

  return {data, isLoading, error, refetch};
};

export default usePortfolioItems;
