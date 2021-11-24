import * as AsBind from 'as-bind';
import { useState, useEffect } from 'react';
import { environment } from '@lib/environment';

type Any = any;

interface State {
  instance: Record<string, Any> | null;
  loaded: boolean;
  error: Error | null;
}

export default function useWasm(imports?: Any): State {
  const [state, setState] = useState<State>({ instance: null, loaded: false, error: null });

  const filePath = `/wasm/${environment.env === 'DEVELOP' ? 'debug' : 'release'}.wasm`;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchWasm = async () => {
      try {
        const wasm = await fetch(filePath, { signal: abortController.signal });
        if (!wasm.ok) throw new Error(`Failed to fetch wasm resource '${filePath}'.`);

        const instance = await (AsBind as Any).instantiate(wasm, {
          util: {
            // eslint-disable-next-line no-console
            consoleLog: (message: string) => console.log(message),
          },
          ...imports,
        });

        if (!abortController.signal.aborted) setState({ instance, loaded: true, error: null });
      } catch (error) {
        if (!abortController.signal.aborted)
          setState({ instance: null, loaded: false, error: error as Error });
      }
    };
    fetchWasm();
    return () => abortController.abort();
  }, [filePath]);

  return state;
}
