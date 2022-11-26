import { Container } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";

import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
import LineChart from "../../components/LineChart";
import TopRow from "../../components/TopRow";
import { setWindowWidth } from "../../reducers/windowWidthReducer";
import { useAppDispatch } from "../../hooks/preTypedHooks";
import useWindowSize from "../../hooks/useWindowSize";

const ChampionDetails = () => {
  const { query, isReady } = useRouter();
  const champion = query.Champion as string;
  const windowWidth = useWindowSize();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  if (!isReady) return <>Loading...</>;

  return (
    <Container>
      <TopRow champion={champion} />
      <Combo champion={champion} />
      <ComponentAdding />
      <LineChart champion={champion} />
    </Container>
  );
};
export default ChampionDetails;
