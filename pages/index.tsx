import { Box, Container, Typography } from "@mui/material";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { ChampName, ChampionType } from "../types/types";
import ChampionList from "../components/ChampionList";
import stats from "../champStats/champStats.json";

const TypographyStyles = {
  textAlign: "center",
  position: "relative",
  "z-index": 10,
};

interface HomeProps {
  champStatsSorted: ChampName[];
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
          {t("mainPage.header")}
        </Typography>
      </Box>

      <ChampionList champStats={champStatsSorted} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const champStats = { ...stats } as ChampionType;
  const champStatsSorted: ChampName[] = Object.values(champStats).map(
    (champion) => champion.name
  );
  return {
    props: {
      champStatsSorted,
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
