import { Box, InputBase, Typography } from "@mui/material";
import { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setMatchLength } from "../reducers/matchLengthReducer";

const inputBaseStyles = {
  fontSize: 36,
  color: "primary.main",
};
const timeHeadingStyle = {
  color: "#121212",
};

const MatchLengthTimer = () => {
  const matchLength = useAppSelector((state) => state.matchLength);
  const dispatch = useAppDispatch();

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setMatchLength(event.target.value));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          backgroundColor: "primary.main",
          borderTopRightRadius: "30px",
          borderTopLeftRadius: "30px",
        }}
      >
        <Typography variant="h4" sx={timeHeadingStyle}>
          Match Length
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#1e1e1e",
          borderBottomRightRadius: "30px",
          borderBottomLeftRadius: "30px",
        }}
      >
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
      </Box>
    </>
  );
};

export default MatchLengthTimer;
