import { useState, useEffect } from 'react';
import * as AsBind from 'as-bind';

interface State {
  instance: Record<string, any> | null;
  error: Error | null;
  loaded: boolean;
}

export default function useWasm(imports?: any): State {
  const [state, setState] = useState<State>({ loaded: false, instance: null, error: null });

  const filePath = '/wasm/release.wasm';

  useEffect(() => {
    const abortController = new AbortController();
    const fetchWasm = async () => {
      try {
        const wasm = await fetch(filePath, { signal: abortController.signal });
        if (!wasm.ok) throw new Error(`Failed to fetch wasm resource '${filePath}'.`);

        const instance = await (AsBind as any).instantiate(wasm, imports);
        if (!abortController.signal.aborted) setState({ loaded: true, instance, error: null });
      } catch (error) {
        if (!abortController.signal.aborted) setState({ loaded: false, instance: null, error });
      }
    };
    fetchWasm();
    return () => abortController.abort();
  }, [filePath, imports]);

  return state;
}
