import { useEffect, useState } from 'react';

interface State {
  mobile: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export default function useDeviceWidth(): State {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    mobile: windowWidth < 640,
    sm: windowWidth < 768,
    md: windowWidth < 1024,
    lg: windowWidth < 1280,
    xl: windowWidth < 1536,
  };
}
