import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { NextComponentType, NextPageContext } from "next";
import { useAppSelector } from "../hooks/preTypedHooks";

interface OverrideCssBaselineProps {
  Component: NextComponentType<NextPageContext, unknown, unknown>;
  pageProps: {};
}
const OverrideCssBaseline = ({
  Component,
  pageProps,
}: OverrideCssBaselineProps) => {
  const primaryColor = useAppSelector((state) => state.primaryColor);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: primaryColor,
      },
    },
    typography: {
      h1: { fontFamily: "Karla" },
      h2: { fontFamily: "Karla" },
      h3: { fontFamily: "Karla" },
      h4: { fontFamily: "Karla" },
      h5: { fontFamily: "Karla" },
      h6: { fontFamily: "Karla" },

      body1: { fontFamily: "Merriweather", fontSize: 12 },
      body2: { fontFamily: "Merriweather", fontSize: 16 },
      button: { fontFamily: "Merriweather" },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default OverrideCssBaseline;
