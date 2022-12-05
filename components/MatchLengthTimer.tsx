import { Box, FormControl, InputBase, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "next-i18next";

import { setMatchLength } from "../reducers/matchLengthReducer";
import { timerToSeconds } from "../helpers/TimerConversions";
import { useAppDispatch } from "../hooks/preTypedHooks";

const InputBaseStyles = {
  fontSize: 24,
  color: "primary.main",
};

const TimeHeadingStyle = {
  color: "#121212",
};

const TextBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "primary.main",
  height: "43px",
  borderTopRightRadius: "30px",
  borderTopLeftRadius: "30px",
};

const InputBoxStyles = {
  backgroundColor: "#1e1e1e",
  borderBottomRightRadius: "30px",
  borderBottomLeftRadius: "30px",
};

const MatchLengthTimer = () => {
  const [matchLengthDisplay, setMatchLengthDisplay] = useState("40:00");
  const [error, setError] = useState("");
  const [color, setColor] = useState("primary.main");
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMatchLengthDisplay(e.target.value);
    setError("");
    const seconds = timerToSeconds(e.target.value);

    if (Number.isNaN(seconds)) {
      setColor("primary.main");
      setError("MM:SS");
    } else {
      setColor("error.light");
      if (seconds < 2400) setError("Too low!");
      else if (seconds > 3600) setError("Too high!");
      else {
        dispatch(setMatchLength(seconds));
      }
    }
  };

  return (
    <>
      <Box sx={TextBoxStyles}>
        <Typography variant="h5" sx={TimeHeadingStyle}>
          {t("champPage.matchLength")}
        </Typography>
      </Box>
      <Box sx={InputBoxStyles}>
        <FormControl>
          <InputBase
            value={matchLengthDisplay}
            onChange={handleChange}
            sx={InputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ position: "absolute", width: "200px", top: "5px" }}>
          <Typography variant="body2" sx={{ color, textAlign: "center" }}>
            {error}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default MatchLengthTimer;
