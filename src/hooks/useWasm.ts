import * as AsBind from 'as-bind';
import { useState, useEffect } from 'react';

type Todo = any;

interface State {
  instance: Record<string, Todo> | null;
  loaded: boolean;
  error: Error | null;
}

export default function useWasm(imports?: Todo): State {
  const [state, setState] = useState<State>({ instance: null, loaded: false, error: null });

  const filePath = '/wasm/release.wasm';

  useEffect(() => {
    const abortController = new AbortController();
    const fetchWasm = async () => {
      try {
        const wasm = await fetch(filePath, { signal: abortController.signal });
        if (!wasm.ok) throw new Error(`Failed to fetch wasm resource '${filePath}'.`);

        const instance = await (AsBind as Todo).instantiate(wasm, imports);
        if (!abortController.signal.aborted) setState({ instance, loaded: true, error: null });
      } catch (error) {
        if (!abortController.signal.aborted)
          setState({ instance: null, loaded: false, error: error as Error });
      }
    };
    fetchWasm();
    return () => abortController.abort();
  }, [filePath, imports]);

  return state;
}
