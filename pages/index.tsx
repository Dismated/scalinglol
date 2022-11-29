import { Box, Container, Typography } from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { ChampionFront, ChampionType } from "../types/types";
import ChampionList from "../components/ChampionList";
import stats from "../champStats/champStats.json";

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

interface HomeProps {
  champStatsSorted: ChampionFront[];
  _props: InferGetStaticPropsType<typeof getStaticProps>;
}

const Home: NextPage<HomeProps> = ({ champStatsSorted }) => {
  const { t } = useTranslation("common");

  return (
    <Container sx={{ p: [0, "16px", "24px"] }}>
      <Box
        sx={{
          left: 0,
          width: "100%",
        }}
      >
        <Typography variant="h1" sx={TypographyStyles}>
          {t("h1")}
        </Typography>
      </Box>
      <Box sx={CircleWrapStyles}>
        <Box sx={CircleStyles} />
      </Box>
      <ChampionList champStats={champStatsSorted} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const champStats = { ...stats } as ChampionType;
  const champStatsSorted: ChampionFront[] = Object.values(champStats)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((champion) => ({
      name: champion.name,
      available: champion.available,
    }));
  return {
    props: {
      champStatsSorted,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
