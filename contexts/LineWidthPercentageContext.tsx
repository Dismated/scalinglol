import React, { createContext } from "react";

const lineWidthPercentage = 90;

export const LineWidthPercentageContext = createContext(lineWidthPercentage);

const LineWidthPercentageProvider = ({
  children,
}: {
  children: JSX.Element;
}) => (
  <LineWidthPercentageContext.Provider value={lineWidthPercentage}>
    {children}
  </LineWidthPercentageContext.Provider>
);

export default LineWidthPercentageProvider;
