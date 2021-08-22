import toast from 'react-hot-toast';

export async function promiseWithCatch<T>(
  promise: Promise<T>,
  messagePrefix?: string,
): Promise<T | null> {
  return promise
    .then((data) => data)
    .catch((error: Error) => {
      const message = `${messagePrefix}: ${error.message.substring(0, error.message.indexOf(':'))}`;
      toast.error(message);
      console.error(message);
      return null;
    });
}
