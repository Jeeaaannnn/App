import { useCallback, useEffect, useRef } from "react";

export function usePreviousState(state?: any) {
  type TState = typeof state;

  const previousState = useRef<TState>(state);
  const newState = useRef<TState>(state);
  const update = useCallback(() => {
    previousState.current = newState.current;
  }, [newState]);

  useEffect(() => {
    newState.current = state;
  }, [state]);

  return { previousState: previousState.current, update };
}
