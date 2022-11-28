import { Container } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ChampName } from "../../types/types";
import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
import LineChart from "../../components/LineChart";
import TopRow from "../../components/TopRow";
import { setChampStats } from "../../reducers/champStatsReducer";
import { setSpells } from "../../reducers/spellsReducer";
import { setWindowWidth } from "../../reducers/windowWidthReducer";
import stats from "../../champStats/champStats.json";
import { useAppDispatch } from "../../hooks/preTypedHooks";
import useWindowSize from "../../hooks/useWindowSize";

const ChampionDetails = () => {
  const { query, isReady } = useRouter();
  const champion = query.Champion as ChampName;
  const windowWidth = useWindowSize();
  const dispatch = useAppDispatch();
  console.log(stats);

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    dispatch(setChampStats(stats[champion]));
    dispatch(setSpells([]));
  }, [dispatch, champion]);

  if (!isReady) return <>Loading...</>;

  return (
    <Container>
      <TopRow />
      <Combo />
      <ComponentAdding />
      <LineChart />
    </Container>
  );
};
export default ChampionDetails;
