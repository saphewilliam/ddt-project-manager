import { ClientError } from 'graphql-request';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export function displayError(message: string): void {
  toast.error(message);
  console.error(message);
}

export default function useDisplayError<T>(
  data: T | undefined,
  error: ClientError | undefined,
): void {
  useEffect(() => {
    if (!data && error) displayError(error.message);
  }, [data, error]);
}
