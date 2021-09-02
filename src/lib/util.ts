import { toast } from 'react-hot-toast';

export function displayError(message: string): void {
  toast.error(message);
  console.error(message);
}

export async function promiseWithCatch<T>(
  promise: Promise<T>,
  messagePrefix?: string,
): Promise<T | null> {
  return promise
    .then((data) => data)
    .catch((error: Error) => {
      displayError(`${messagePrefix}: ${error.message.substring(0, error.message.indexOf(':'))}`);
      return null;
    });
}
