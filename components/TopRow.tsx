import { Box, InputBase, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setMatchLength } from "../reducers/matchLengthReducer";

const inputBaseStyles = {
  fontSize: 36,
  color: "primary.main",
};
const timeHeadingStyle = {
  color: "#121212",
};

const TopRow = () => {
  const matchLength = useAppSelector((state) => state.matchLength);
  const champStats = useAppSelector((state) => state.champStats);
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
          src={`/icons/champions/${champStats.name}.png`}
          alt={champStats.name}
          width="130"
          height="130"
        />
        <Box sx={{ pl: "5px" }}>
          <Box>
            <Typography variant="h2" sx={{ display: "inline" }}>
              {champStats.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ display: "inline" }}>
              {champStats.title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "inline-block",
          float: "right",
          width: "220px",
        }}
      >
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
      </Box>
    </Box>
  );
};

export default TopRow;
