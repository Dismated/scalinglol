import { Container } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { ChampName } from "../../types/types";
import Chart from "../../components/Chart";
import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
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

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    dispatch(setChampStats(stats[champion]));
    dispatch(setSpells([]));
  }, [dispatch, champion]);

  if (!isReady) return <>Loading...</>;

  return (
    <Container sx={{ px: [0, "16px", "24px"] }}>
      <TopRow />
      <Combo />
      <ComponentAdding />
      <Chart />
    </Container>
  );
};
export default ChampionDetails;
