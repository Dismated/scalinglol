import { AppBar, Container, Typography } from "@mui/material";
import type { NextPage } from "next";

import ChampionList from "../components/ChampionList";

// eslint-disable-next-line react/function-component-definition
const Home: NextPage = () => (
  <Container>
    <AppBar>
      <Container>
        <Typography variant="h3">League Calculator</Typography>
      </Container>
    </AppBar>
    <ChampionList />
  </Container>
);

export default Home;
