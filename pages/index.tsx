import { AppBar, Container, CssBaseline, Typography } from "@mui/material";
import type { NextPage } from "next";
import { ThemeProvider } from "@mui/material/styles";

import ChampionList from "../components/ChampionList";
import darkTheme from "../styles/darkTheme";

// eslint-disable-next-line react/function-component-definition
const Home: NextPage = () => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Container>
      <AppBar>
        <Typography variant="h1">League Calculator </Typography>
      </AppBar>
      <ChampionList />
    </Container>
  </ThemeProvider>
);

export default Home;
