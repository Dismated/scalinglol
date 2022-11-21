import {
  Box,
  Button,
  Container,
  FormControl,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../hooks/preTypedHooks";
import { ChampNameType } from "../../types/types";
import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
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
};

const ChampionDetails = () => {
  const { query, isReady } = useRouter();
  const champion = query.Champion as string;

  const windowWidth = useWindowSize();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [dispatch, windowWidth]);
  const matchLength = useAppSelector((state) => state.matchLength);

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setMatchLength(event.target.value));
  };
  if (!isReady) return <>Loading...</>;

  return (
    <Container>
      <Button>
        <Link href="/">
          <a>{"<--Back"}</a>
        </Link>
      </Button>
      <Box>
        <Box sx={{ display: "inline-block" }}>
          <Image
            src={`/../public/championIcons/${champion}.png`}
            alt={champion}
            width="100"
            height="100"
          />
        </Box>
        <Box sx={{ display: "inline-block" }}>
          <Typography variant="h3">{champion}</Typography>
          <Typography variant="h5">{champStats[champion].title}</Typography>
        </Box>
      </Box>

      <>
        <Typography variant="h4">Match Length</Typography>
        <FormControl>
          <InputBase
            value={matchLength}
            onChange={(event) => handleMatchLengthChange(event)}
            sx={inputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
                width: "100%",
              },
            }}
          />
        </FormControl>
        <Combo champion={champion} />
        <ComponentAdding
          heading="Attack"
          component="slider"
          champion={champion}
        />
        <ComponentAdding
          heading="Defence"
          component="slider"
          champion={champion}
        />
        <ComponentAdding
          heading="Graphs"
          component="graph"
          champion={champion}
        />
      </>
    </Container>
  );
};
export default ChampionDetails;
