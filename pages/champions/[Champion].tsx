import { GetStaticPaths, GetStaticProps } from "next";
import { Container } from "@mui/material";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ChampName, LvlsType } from "../../types/types";
import Chart from "../../components/Chart";
import Combo from "../../components/Combo";
import Skills from "../../components/Skills";
import TopRow from "../../components/TopRow";
import { setChampStats } from "../../reducers/champStatsReducer";
import { setLvlUp } from "../../reducers/lvlUpReducer";
import { setSpells } from "../../reducers/spellsReducer";
import { setWindowWidth } from "../../reducers/windowWidthReducer";
import stats from "../../champStats/champStats.json";
import { useAppDispatch } from "../../hooks/preTypedHooks";
import useWindowSize from "../../hooks/useWindowSize";

const emptyLvls: LvlsType[] = new Array(18).fill({
  Q: 0,
  W: 0,
  E: 0,
  R: 0,
});

const ChampionDetails = () => {
  const { query } = useRouter();
  const champion = query.Champion as ChampName;
  const windowWidth = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    dispatch(setChampStats(stats[champion]));
    dispatch(setSpells([]));
    dispatch(setLvlUp(emptyLvls));
  }, [dispatch, champion]);

  return (
    <>
      <Head>
        <title>{champion}</title>
      </Head>
      <Container sx={{ px: [0, "16px", "24px"] }}>
        <TopRow />
        <Combo />
        <Skills />
        <Chart />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(stats).map((champion) => `/champions/${champion}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default ChampionDetails;
