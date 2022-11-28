import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";

import ChampionList from "../components/ChampionList";

const BoxStyles = {
  height: "100px",
  width: "100px",
  backgroundColor: "#121212",
  borderRadius: "50%",
  position: "relative",
  top: 0,
  right: "225px",
  "z-index": 5,
};

const Home: NextPage = () => (
  <Container>
    <Box
      sx={{
        left: 0,
        width: "100%",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          position: "relative",
          "z-index": 10,
        }}
      >
        League of Scaling
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: "19px",
        left: "50%",
      }}
    >
      <Box sx={BoxStyles} />
    </Box>
    <ChampionList />
  </Container>
);

export default Home;
