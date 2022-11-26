import {
  Box,
  Divider,
  FormControl,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { ChampNameType } from "../types/types";
import { setMatchLength } from "../reducers/matchLengthReducer";
import stats from "../champStats/champStats.json";

const champStats: ChampNameType = { ...stats };

const inputBaseStyles = {
  fontSize: 36,
  color: "#121212",
};
const timeHeadingStyle = {
  color: "#121212",
};

const TopRow = ({ champion }: { champion: string }) => {
  const matchLength = useAppSelector((state) => state.matchLength);
  const dispatch = useAppDispatch();

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setMatchLength(event.target.value));
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Image
          src={`/icons/champions/${champion}.png`}
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
      <Box
        sx={{
          display: "inline-block",
          float: "right",
          borderRadius: "30px",
          backgroundColor: "primary.main",
          width: "220px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50%",
          }}
        >
          <Typography variant="h4" sx={timeHeadingStyle}>
            Match Length
          </Typography>
        </Box>
        <Divider
          sx={{ borderWidth: "1px", borderColor: "background.default" }}
        />
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
  );
};

export default TopRow;
