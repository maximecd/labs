import { useState } from 'react';

function useReset(): [number, () => void] {
  const [key, setKey] = useState(Date.now());

  function reset() {
    setKey(Date.now());
  }

  return [key, reset];
}

export default useReset;
