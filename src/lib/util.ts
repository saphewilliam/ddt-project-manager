import { randomBytes } from 'crypto';
import { ParsedUrlQuery } from 'querystring';
import { displayError } from '@hooks/useDisplayError';

export function extractURLParam(name: string, query?: ParsedUrlQuery): string | null {
  if (!query) return null;
  const raw = query[name];
  const result: string | null = (Array.isArray(raw) ? raw[0] : raw) || null;
  return result;
}

export function generateSlug(raw: string): string {
  return `${raw.toLowerCase().replace(' ', '-').replace('.', '')}-${randomBytes(6).toString(
    'hex',
  )}`;
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
