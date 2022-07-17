import * as AsBind from 'as-bind';
import { useState, useEffect, ReactNode, ReactElement, createContext, useContext } from 'react';
import { environment } from '@lib/environment';
import { displayError } from './useDisplayError';

// TODO typing
type Any = any;

interface State {
  instance: Record<string, Any> | null;
  // TODO loading instead of loaded?
  loaded: boolean;
  error: Error | null;
}

export interface Props {
  imports?: Any;
  children: ReactNode;
}

const WasmContext = createContext<State>({
  instance: null,
  loaded: false,
  error: new Error('Session context not found'),
});

export function WasmProvider(props: Props): ReactElement {
  const [state, setState] = useState<State>({ instance: null, loaded: false, error: null });

  const filePath = `/wasm/${environment.nodeEnv === 'development' ? 'debug' : 'release'}.wasm`;

  useEffect(() => {
    const abortController = new AbortController();
    const fetchWasm = async () => {
      try {
        const wasm = await fetch(filePath, { signal: abortController.signal });
        if (!wasm.ok) throw new Error(`Failed to fetch wasm resource '${filePath}'.`);

        const instance = await (AsBind as Any).instantiate(wasm, {
          util: {
            displayError,
            // eslint-disable-next-line no-console
            consoleLog: (message: string) => console.log(message),
            // eslint-disable-next-line no-console
            consoleTime: (label: string) => console.time(label),
            // eslint-disable-next-line no-console
            consoleTimeEnd: (label: string) => console.timeEnd(label),
          },
          ...props.imports,
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

  return <WasmContext.Provider value={state}>{props.children}</WasmContext.Provider>;
}

export default function useWasm(): State {
  return useContext(WasmContext);
}
