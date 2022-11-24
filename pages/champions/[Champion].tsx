import {
  Box,
  Container,
  FormControl,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../hooks/preTypedHooks";
import { ChampNameType } from "../../types/types";
import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
import LineChart from "../../components/LineChart";
import { setMatchLength } from "../../reducers/matchLengthReducer";
import { setWindowWidth } from "../../reducers/windowWidthReducer";
import stats from "../../champStats/champStats.json";
import useWindowSize from "../../hooks/useWindowSize";

const champStats: ChampNameType = { ...stats };

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
  height: "130px",
  width: "130px",
  fontSize: 36,
};
const timeHeadingStyle = {
  transform: "rotate(-90deg)",
  position: "relative",
  left: "48px",
  top: "50px",
  display: "inline-block",
};

const ChampionDetails = () => {
  const { query, isReady } = useRouter();
  const champion = query.Champion as string;
  const windowWidth = useWindowSize();
  const dispatch = useAppDispatch();
  const matchLength = useAppSelector((state) => state.matchLength);

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setMatchLength(event.target.value));
  };
  if (!isReady) return <>Loading...</>;

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Image
            src={`/championIcons/${champion}.png`}
            alt={champion}
            width="130"
            height="130"
          />
          <Box>
            <Box>
              <Typography variant="h2" sx={{ display: "inline" }}>
                {champion}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5" sx={{ display: "inline" }}>
                {champStats[champion].title}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "inline-block", float: "right" }}>
          <Typography variant="h6" sx={timeHeadingStyle}>
            Match Length
          </Typography>
          <FormControl>
            <InputBase
              value={matchLength}
              onChange={(event) => handleMatchLengthChange(event)}
              sx={inputBaseStyles}
              inputProps={{
                style: {
                  textAlign: "center",
                },
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Combo champion={champion} />
      <ComponentAdding />
      <LineChart champion={champion} />
    </Container>
  );
};
export default ChampionDetails;
