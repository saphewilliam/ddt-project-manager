import { useRouter } from 'next/router';

interface Param {
  /** The type of the url param (optional, default: string) */
  type?: 'string' | 'number' | 'boolean';
  /** Whether the url param is an array or not (optional, default: false) */
  array?: boolean;
}

type Params = { [key: string]: Param };

type ReturnArrayType<P extends Param, T> = P extends { array: true } ? T[] : T | null;

type ReturnType<P extends Param> = ReturnArrayType<
  P,
  P extends { type: 'number' } ? number : P extends { type: 'boolean' } ? boolean : string
>;

export default function useURLParams<T extends Params>(
  params: T,
): { [K in keyof T]: ReturnType<T[K]> } {
  const router = useRouter();
  return {};
}

const iets = useURLParams({
  default: {},
  defaultArr: { array: true },
  defaultNoArr: { array: false },
  string: { type: 'string' },
  stringArr: { type: 'string', array: true },
  stringNoArr: { type: 'string', array: false },
  number: { type: 'number' },
  numberArr: { type: 'number', array: true },
  numberNoArr: { type: 'number', array: false },
  boolean: { type: 'boolean' },
  booleanArr: { type: 'boolean', array: true },
  booleanNoArr: { type: 'boolean', array: false },
});
