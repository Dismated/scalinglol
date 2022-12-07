import { Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { lazy, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Head from "next/head";

import { ChampName } from "@customTypes/customTypes";
import { setChampStats } from "@reducers/champStatsReducer";
import { setLvlUp } from "@reducers/lvlUpReducer";
import { setSpells } from "@reducers/spellsReducer";
import { setWindowWidth } from "@reducers/windowWidthReducer";
import { useAppDispatch } from "@hooks/preTypedHooks";
import Combo from "@components/Combo";
import EnemyLvl from "@components/EnemyLvl";
import SkillOrder from "@components/SkillOrder";
import TopRow from "@components/TopRow";
import YourLvl from "@components/YourLvl";
import stats from "@champStats/champStats.json";
import updateLvls, { emptyLvls, lvlUpR } from "@helpers/UpdateLvls";
import useWindowSize from "@hooks/useWindowSize";

const Chart = lazy(() => import("../../components/Chart"));

const ChampionDetails = () => {
  const { query } = useRouter();
  const champion = query.Champion as ChampName;
  const windowWidth = useWindowSize();
  const dispatch = useAppDispatch();
  const [skillsLvlUped, setSkillsLvlUped] = useState(false);

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    dispatch(setChampStats(stats[champion]));
    dispatch(setSpells([]));
    dispatch(setLvlUp(updateLvls("R", lvlUpR, emptyLvls)));
  }, [dispatch, champion]);

  return (
    <>
      <Head>
        <title>{champion}</title>
      </Head>
      <Container sx={{ px: [0, "16px", "24px"] }}>
        <TopRow />
        {skillsLvlUped ? (
          <YourLvl />
        ) : (
          <SkillOrder setSkillsLvlUped={setSkillsLvlUped} />
        )}
        <Combo />
        <EnemyLvl />
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
