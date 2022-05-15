import { nanoid } from 'nanoid';
import { ParsedUrlQuery } from 'querystring';
import { ProjectType } from '@graphql/__generated__/codegen-self';
import { displayError } from '@hooks/useDisplayError';

export function fontColorFromBackgroundHex(hex: string): string {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return fontColorFromBackgroundRgb(r, g, b);
}

export function fontColorFromBackgroundRgb(r: number, g: number, b: number): string {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  if (luminance > 0.5) return '#000';
  else return '#fff';
}

export function formatNumber(number: number): string {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1.');
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise<T>(obj: any): obj is Promise<T> {
  return String(obj) === '[object Promise]';
}

export function projectTypeToString(projectType: ProjectType): string {
  switch (projectType) {
    case ProjectType.FIELD_L1:
      return 'L1 field';
    case ProjectType.FIELD_L2:
      return 'L2 field';
    case ProjectType.FIELD_M50:
      return 'M50 field';
    case ProjectType.FIELD_FLAT:
      return 'Flat field';
    case ProjectType.FIELD_CROSS_L1:
      return 'L1 crossfield';
    case ProjectType.FIELD_CROSS_L2:
      return 'L2 crossfield';
    case ProjectType.FIELD_CROSS_M50:
      return 'M50 crossfield';
    case ProjectType.FIELD_CIRCLE:
      return 'Circle field';
    case ProjectType.WALL_X:
      return 'X-wall';
    case ProjectType.WALL_S:
      return 'S-wall';
    case ProjectType.WALL_T:
      return 'T-wall';
    case ProjectType.WALL_SPEED:
      return 'Speed wall';
    case ProjectType.WALL_CUBE:
      return 'Cube wall';
    case ProjectType.WALL_OCTO:
      return 'Octo-wall';
    case ProjectType.FALLWALL:
      return 'Fallwall';
    case ProjectType.SPIRAL:
      return 'Spiral';
    case ProjectType.STRUCTURE:
      return 'Structure';
    case ProjectType.FREE_HAND:
      return 'Free hand';
    case ProjectType.DECOR:
      return 'Decor';
    case ProjectType.OTHER:
      return 'Other';
  }
}
