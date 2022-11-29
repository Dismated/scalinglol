import { Box, InputBase, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import { useTranslation } from "next-i18next";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setMatchLength } from "../reducers/matchLengthReducer";

const InputBaseStyles = {
  fontSize: 36,
  color: "primary.main",
};

const TimeHeadingStyle = {
  color: "#121212",
};

const TextBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "50%",
  backgroundColor: "primary.main",
  borderTopRightRadius: "30px",
  borderTopLeftRadius: "30px",
};

const InputBoxStyles = {
  backgroundColor: "#1e1e1e",
  borderBottomRightRadius: "30px",
  borderBottomLeftRadius: "30px",
};

const MatchLengthTimer = () => {
  const matchLength = useAppSelector((state) => state.matchLength);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setMatchLength(event.target.value));
  };

  return (
    <>
      <Box sx={TextBoxStyles}>
        <Typography variant="h4" sx={TimeHeadingStyle}>
          {t("matchLength")}
        </Typography>
      </Box>
      <Box sx={InputBoxStyles}>
        <InputBase
          value={matchLength}
          onChange={(event) => handleMatchLengthChange(event)}
          sx={InputBaseStyles}
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
