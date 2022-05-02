/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo, useRef, useState } from 'react';

/** Object used to define the reducer's actions. The first argument is the current state and all following arguments are user-defined. */
type InputActions<S> = { [key: string]: (currentState: S, ...args: any) => Promise<S> | S };

/** Object used to consume the reducer's actions. The parameters are inferred from the input actions object, dropping the first argument (current state). */
type OutputActions<S, A extends InputActions<S>> = {
  [P in keyof A]: (...args: Parameters<A[P]> extends [any, ...infer U] ? U : never) => void;
};

interface Action<S> {
  actionName: string;
  action: (...args: any) => Promise<S> | S;
  args: any[];
}

interface Error<S> {
  message: string;
  action: Action<S>;
  pendingActions: Action<S>[];
}

interface State<S, A extends InputActions<S>> {
  state: S;
  actions: OutputActions<S, A>;
  isLoading: boolean;
  error: Error<S> | null;
}

function isPromise<T>(obj: any): obj is Promise<T> {
  return String(obj) === '[object Promise]';
}

export default function useAsyncReducer<S, A extends InputActions<S>>(
  // TODO Support promise and function initial state
  initialState: S,
  actions: A,
): State<S, A> {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<S>(initialState);
  const [error, setError] = useState<Error<S> | null>(null);

  const { current: queue } = useRef<Action<S>[]>([]);

  const popQueue = useCallback(
    (previousState: S) => {
      const currentAction = queue.shift();
      setIsLoading(currentAction !== undefined);

      const evaluateQueue = (currentState: S) => {
        setState(currentState);
        if (queue.length === 0) setIsLoading(false);
        else popQueue(currentState);
      };

      const abortQueue = (error: any) => {
        setIsLoading(false);
        if (currentAction)
          setError({
            message: String(error),
            action: currentAction,
            pendingActions: queue,
          });
      };

      if (currentAction !== undefined) {
        try {
          const returnVal = currentAction.action(previousState, ...currentAction.args);
          if (isPromise(returnVal)) returnVal.then(evaluateQueue).catch(abortQueue);
          else evaluateQueue(returnVal);
        } catch (e) {
          abortQueue(e);
        }
      }
    },
    [queue],
  );

  const pushQueue = useCallback(
    (action: Action<S>) => {
      queue.push(action);
      if (!isLoading) popQueue(state);
    },
    [queue, isLoading, state, popQueue],
  );

  /** An actions object that proxies the user-defined actions */
  const outputActions: OutputActions<S, A> = useMemo(
    () =>
      Object.entries(actions).reduce(
        (prev, [actionName, action]) => ({
          ...prev,
          // Push the user-defined action to the queue when it is called from outside the hook
          [actionName]: (...args) => pushQueue({ actionName, action, args }),
        }),
        {} as OutputActions<S, A>,
      ),
    [actions],
  );

  return { actions: outputActions, isLoading, state, error };
}
