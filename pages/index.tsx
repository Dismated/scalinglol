import { Box, Container, Typography } from "@mui/material";
import type { NextPage } from "next";

import ChampionList from "../components/ChampionList";

const CircleWrapStyles = {
  display: { xs: "none", sm: "flex" },
  justifyContent: "center",
  position: "absolute",
  top: { sm: "15px", md: "25px", lg: "42px" },
  left: "50%",
};
const CircleStyles = {
  height: { sm: "90px", md: "100px" },
  width: { sm: "90px", md: "100px" },
  backgroundColor: "#121212",
  borderRadius: "50%",
  position: "relative",
  top: 0,
  right: { sm: "176px", md: "198px", lg: "224px" },
  "z-index": 5,
};

const TypographyStyles = {
  textAlign: "center",
  position: "relative",
  "z-index": 10,
};

const Home: NextPage = () => (
  <Container sx={{ p: [0, "16px", "24px"] }}>
    <Box
      sx={{
        left: 0,
        width: "100%",
      }}
    >
      <Typography variant="h1" sx={TypographyStyles}>
        League of Scaling
      </Typography>
    </Box>
    <Box sx={CircleWrapStyles}>
      <Box sx={CircleStyles} />
    </Box>
    <ChampionList />
  </Container>
);

export default Home;
