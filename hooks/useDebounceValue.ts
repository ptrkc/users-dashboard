import { useEffect, useState } from 'react';

export function useDebounceValue(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    const debounce = () => setDebouncedValue(value);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(debounce, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return debouncedValue;
}
