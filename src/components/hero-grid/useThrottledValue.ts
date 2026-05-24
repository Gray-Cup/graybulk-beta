import { useCallback, useRef, useState } from 'react';

export const useThrottledValue = <T>(value: T, delay: number) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedAt = useRef(0);
  const throttleTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateThrottledValue = useCallback(
    (newValue: T) => {
      const now = Date.now();
      const timeElapsed = now - lastExecutedAt.current;

      if (timeElapsed >= delay) {
        if (throttleTimeoutIdRef.current) {
          clearTimeout(throttleTimeoutIdRef.current);
          throttleTimeoutIdRef.current = undefined;
        }
        setThrottledValue(newValue);
        lastExecutedAt.current = now;
      } else if (!throttleTimeoutIdRef.current) {
        throttleTimeoutIdRef.current = setTimeout(() => {
          setThrottledValue(newValue);
          lastExecutedAt.current = Date.now();
          throttleTimeoutIdRef.current = undefined;
        }, delay - timeElapsed);
      }
    },
    [delay],
  );

  if (value !== throttledValue) updateThrottledValue(value);

  return throttledValue;
};
