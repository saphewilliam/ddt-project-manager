import React, { createContext, ReactElement, ReactNode, useState, useEffect } from 'react';

export interface Props {
  children?: ReactNode;
}

export type State = {
  zero: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
} | null;

export const DeviceWidthContext = createContext<State>(null);

export default function DeviceWidthProvider(props: Props): ReactElement {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [breakpoints, setBreakpoints] = useState<State>(null);

  useEffect(
    () =>
      setBreakpoints({
        zero: windowWidth === 0,
        xs: windowWidth > 0 && windowWidth < 640,
        sm: windowWidth >= 640 && windowWidth < 768,
        md: windowWidth >= 768 && windowWidth < 1024,
        lg: windowWidth >= 1024 && windowWidth < 1280,
        xl: windowWidth >= 1280 && windowWidth < 1536,
        xxl: windowWidth >= 1536,
      }),
    [windowWidth],
  );

  useEffect(() => {
    const handleResize = () => window.innerWidth !== 0 && setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceWidthContext.Provider value={breakpoints}>{props.children}</DeviceWidthContext.Provider>
  );
}
