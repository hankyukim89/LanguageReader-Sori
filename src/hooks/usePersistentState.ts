import { useCallback, useState } from 'react';

interface StoredValue<T> { version: 1; value: T }

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initialValue;
      const stored = JSON.parse(raw) as StoredValue<T>;
      return stored.version === 1 ? stored.value : initialValue;
    } catch { return initialValue; }
  });

  const update = useCallback((next: T | ((current: T) => T)) => {
    setValue(current => {
      const resolved = next instanceof Function ? next(current) : next;
      localStorage.setItem(key, JSON.stringify({ version:1, value:resolved } satisfies StoredValue<T>));
      return resolved;
    });
  }, [key]);

  return [value, update] as const;
}
