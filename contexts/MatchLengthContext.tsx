import React, { createContext } from "react";

export const MatchLengthContext = createContext("30:00");

const MatchLengthProvider = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: string;
}) => (
  <MatchLengthContext.Provider value={value}>
    {children}
  </MatchLengthContext.Provider>
);

export default MatchLengthProvider;
