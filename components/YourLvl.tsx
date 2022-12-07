import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Color from "color";

import { setAttackSwitch } from "@reducers/attackSwitchReducer";
import { useAppDispatch, useAppSelector } from "@hooks/preTypedHooks";
import CurvedCorner from "./CurvedCorner";
import MultiNodeSlider from "./MultiNodeSlider";

const ButtonGroupStyles = {
  display: "inline-block",
  float: "right",
};

const CurvedCorner1Styles = {
  display: "inline-block",
  bottom: "9px",
  position: "relative",
};
const PaperStyles = {
  borderRadius: [0, "30px"],
  pl: 0,
  overflow: "clip",
  overflowClipMargin: "30px",
};

const YourLvl = () => {
  const dispatch = useAppDispatch();
  const switchValue = useAppSelector((state) => state.attackSwitch);
  const theme = useTheme();
  const darkerPrimary = Color(theme.palette.primary.main)
    .hsl()
    .desaturate(0.3)
    .darken(0.55)
    .string();
  const { t } = useTranslation("common");

  const backgroundColorTimer =
    switchValue === "timer" ? "primary.main" : darkerPrimary;
  const backgroundColorLvlUp =
    switchValue === "lvlUp" ? "primary.main" : darkerPrimary;

  const cornerTimer =
    switchValue === "timer" ? theme.palette.primary.main : darkerPrimary;
  const cornerLvlUp =
    switchValue === "lvlUp" ? theme.palette.primary.main : darkerPrimary;

  const timerBoxStyles = {
    backgroundColor: `${backgroundColorTimer}`,
    color: `${theme.palette.background.default}`,
    borderBottomLeftRadius: 23,
    fontSize: 24,
    pl: ["10px", "20px"],
    pr: "20px",
    py: 0,
    display: "inline-block",
    cursor: "pointer",
  };

  const lvlUpBoxStyles = {
    backgroundColor: `${backgroundColorLvlUp}`,
    color: `${theme.palette.background.default}`,
    borderTopRightRadius: [0, "30px"],
    pl: "20px",
    pr: ["5px", "20px"],
    py: 0,
    display: "inline-block",
    cursor: "pointer",
  };

  return (
    <Paper sx={PaperStyles}>
      <Typography
        variant="h4"
        sx={{ display: "inline-block", pt: "5px", pl: [0, "15px"] }}
      >
        {t("champPage.skillsContainer.header")}
      </Typography>
      <Box sx={ButtonGroupStyles}>
        <Box sx={CurvedCorner1Styles}>
          <CurvedCorner
            corner="topRight"
            size={15}
            frontColor={cornerTimer}
            backColor="#1e1e1e"
          />
        </Box>
        <Box
          onClick={() => dispatch(setAttackSwitch("timer"))}
          sx={timerBoxStyles}
        >
          <Typography variant="h5">
            {t("champPage.skillsContainer.timer")}
          </Typography>
        </Box>
        <Box sx={{ display: "inline-block", position: "relative" }}>
          <Box sx={{ position: "absolute", top: "-24px", right: "0px" }}>
            <CurvedCorner
              corner="topRight"
              size={15}
              frontColor={cornerLvlUp}
              backColor={cornerTimer}
            />
          </Box>
          <Box sx={{ position: "absolute", top: "-7px" }}>
            <CurvedCorner
              corner="bottomLeft"
              size={15}
              frontColor={cornerTimer}
              backColor={cornerLvlUp}
            />
          </Box>
        </Box>
        <Box
          onClick={() => dispatch(setAttackSwitch("lvlUp"))}
          sx={lvlUpBoxStyles}
        >
          <Typography variant="h5">
            {t("champPage.skillsContainer.levelUp")}
          </Typography>
        </Box>
      </Box>
      <MultiNodeSlider nodeOptions="your" />
    </Paper>
  );
};

export default YourLvl;
