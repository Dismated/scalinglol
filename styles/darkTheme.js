import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#",
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

export default darkTheme;
