import { useEffect, useState } from 'react';

export default function useIntermediateMemo<T>(input: T): T {
  const [object, setObject] = useState<T>(input);

  useEffect(() => {
    if (JSON.stringify(object) !== JSON.stringify(input)) setObject(input);
  }, [input]);

  return object;
}
