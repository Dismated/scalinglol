import React, { createContext } from "react";

export const WindowWidthContext = createContext<number | undefined>(0);

const WindowWidthProvider = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: number | undefined;
}) => (
  <WindowWidthContext.Provider value={value}>
    {children}
  </WindowWidthContext.Provider>
);

export default WindowWidthProvider;
