import {
  Button,
  Container,
  FormControl,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../hooks/preTypedHooks";
import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
import { setMatchLength } from "../../reducers/matchLengthReducer";
import { setWindowWidth } from "../../reducers/windowWidthReducer";
import useWindowSize from "../../hooks/useWindowSize";

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
};

const ChampionDetails = () => {
  const router = useRouter();
  const { Champion } = router.query;

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

  return (
    <Container>
      <Button>
        <Link href="/">
          <a>{"<--Back"}</a>
        </Link>
      </Button>
      <Typography variant="h3">{Champion}</Typography>
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
        <Combo champion={Champion} />
        <ComponentAdding
          heading="Attack"
          component="slider"
          champion={Champion}
        />
        <ComponentAdding
          heading="Defence"
          component="slider"
          champion={Champion}
        />
        <ComponentAdding
          heading="Graphs"
          component="graph"
          champion={Champion}
        />
      </>
    </Container>
  );
};
export default ChampionDetails;
