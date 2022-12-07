import * as Colors from "@mui/material/colors";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { NextComponentType, NextPageContext } from "next";
import { useAppSelector } from "@hooks/preTypedHooks";

const ColorsWithType: Record<string, { [c: string]: string }> = { ...Colors };

interface OverrideCssBaselineProps {
  Component: NextComponentType<NextPageContext, unknown, unknown>;
  pageProps: {};
}

const OverrideCssBaseline = ({
  Component,
  pageProps,
}: OverrideCssBaselineProps) => {
  const primaryColor = useAppSelector((state) => state.primaryColor);

  const darkTheme = responsiveFontSizes(
    createTheme({
      palette: {
        mode: "dark",
        primary: {
          main: ColorsWithType[primaryColor][400],
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
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "30px",
              marginTop: "15px",
              paddingLeft: "15px",
            },
          },
        },
      },
    }),
    { factor: 2.8, variants: ["h1"] }
  );
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default OverrideCssBaseline;
