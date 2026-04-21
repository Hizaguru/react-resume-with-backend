import {useEffect, useState} from 'react';

import {client} from '../client';
import {SanityImage} from '../data/dataDef';

interface UseProfileImageResult {
  image: SanityImage | null;
  isLoading: boolean;
  error: Error | null;
}

const useProfileImage = (): UseProfileImageResult => {
  const [image, setImage] = useState<SanityImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const query = '*[_type == "profile"]';
    client
      .fetch<SanityImage[]>(query)
      .then(data => {
        if (cancelled) return;
        setImage(data?.[0] ?? null);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error('Failed to load profile image'));
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return {image, isLoading, error};
};

export default useProfileImage;
