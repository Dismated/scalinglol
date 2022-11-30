import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import CurvedCorner from "./CurvedCorner";
import MultiNodeSlider from "./MultiNodeSlider";
import { setAttackSwitch } from "../reducers/attackSwitchReducer";

const ButtonGroupStyles = {
  display: "inline-block",
  float: "right",
};

const CurvedCorner1Styles = {
  display: "inline-block",
  bottom: "12px",
  position: "relative",
};

const ComponentAdding = () => {
  const dispatch = useAppDispatch();
  const switchValue = useAppSelector((state) => state.attackSwitch);
  const theme = useTheme();
  const { t } = useTranslation("common");

  const backgroundColorTimer =
    switchValue === "timer" ? "primary.main" : "#1e1e1e";
  const backgroundColorLvlUp =
    switchValue === "lvlUp" ? "primary.main" : "#1e1e1e";

  const colorTimer =
    switchValue === "timer" ? "background.default" : "primary.main";
  const colorLvlUp =
    switchValue === "lvlUp" ? "background.default" : "primary.main";

  const cornerTimer =
    switchValue === "timer" ? theme.palette.primary.main : "#1e1e1e";
  const cornerLvlUp =
    switchValue === "lvlUp" ? theme.palette.primary.main : "#1e1e1e";

  const timerBoxStyles = {
    backgroundColor: `${backgroundColorTimer}`,
    color: `${colorTimer}`,
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
    color: `${colorLvlUp}`,
    borderTopRightRadius: [0, "30px"],
    pl: "20px",
    pr: ["5px", "20px"],
    py: 0,
    display: "inline-block",
    cursor: "pointer",
  };

  const handleTimerButton = () => {
    dispatch(setAttackSwitch("timer"));
  };
  const handleLvlUpButton = () => {
    dispatch(setAttackSwitch("lvlUp"));
  };

  return (
    <Paper
      sx={{
        borderRadius: [0, "30px"],
        pl: [0, "15px"],
        overflow: "clip",
        overflowClipMargin: "30px",
      }}
    >
      <Typography variant="h3" sx={{ display: "inline-block" }}>
        {t("container2.header")}
      </Typography>
      <Box sx={ButtonGroupStyles}>
        <Box sx={CurvedCorner1Styles}>
          <CurvedCorner
            corner="topRight"
            size={20}
            frontColor={cornerTimer}
            backColor="#1e1e1e"
          />
        </Box>
        <Box onClick={handleTimerButton} sx={timerBoxStyles}>
          <Typography variant="h4">{t("container2.timer")}</Typography>
        </Box>
        <Box sx={{ display: "inline-block", position: "relative" }}>
          <Box sx={{ position: "absolute", top: "-32px", right: "0px" }}>
            <CurvedCorner
              corner="topRight"
              size={20}
              frontColor={cornerLvlUp}
              backColor={cornerTimer}
            />
          </Box>
          <Box sx={{ position: "absolute", top: "-10px" }}>
            <CurvedCorner
              corner="bottomLeft"
              size={20}
              frontColor={cornerTimer}
              backColor={cornerLvlUp}
            />
          </Box>
        </Box>
        <Box onClick={handleLvlUpButton} sx={lvlUpBoxStyles}>
          <Typography variant="h4">{t("container2.levelUp")}</Typography>
        </Box>
      </Box>

      <MultiNodeSlider />
    </Paper>
  );
};

export default ComponentAdding;
