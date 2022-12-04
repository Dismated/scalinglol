import { Box, FormControl, InputBase, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setMatchLength } from "../reducers/matchLengthReducer";

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
  const matchLength = useAppSelector((state) => state.matchLength);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

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
            value={matchLength}
            onChange={(e) => dispatch(setMatchLength(e.target.value))}
            sx={InputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default MatchLengthTimer;
