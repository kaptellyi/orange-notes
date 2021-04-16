import { useEffect, useState } from 'react';

export const useRender = (isActive: boolean): [boolean, () => void] => {
  const [render, setRender] = useState(isActive);

  useEffect(() => {
    if (isActive) setRender(true);
  }, [isActive]);

  const animationEndHandler = () => setRender(isActive);

  return [render, animationEndHandler];
};
