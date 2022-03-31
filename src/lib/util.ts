import { nanoid } from 'nanoid';
import { ParsedUrlQuery } from 'querystring';
import { displayError } from '@hooks/useDisplayError';

export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${day}-${month}-${date.getFullYear()}`;
}

export function extractURLParam(name: string, query?: ParsedUrlQuery): string | null {
  if (!query) return null;
  const raw = query[name];
  const result: string | null = (Array.isArray(raw) ? raw[0] : raw) || null;
  return result;
}

export function generateSlug(raw: string): string {
  return `${raw.toLowerCase().replace(/[.'-]/g, '').replace(/\s+/g, '-')}-${nanoid(6)}`;
}

export async function promiseWithCatch<T>(
  promise: Promise<T>,
  messagePrefix?: string,
): Promise<T | null> {
  return promise
    .then((data) => data)
    .catch((error: Error) => {
      displayError(
        `${messagePrefix ?? 'ERROR'}: ${error.message.substring(0, error.message.indexOf(':'))}`,
      );
      return null;
    });
}
