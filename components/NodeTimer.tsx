import { Box, ClickAwayListener, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSkillTime } from "../reducers/skillTimeReducer";
import { timerToSeconds } from "../helpers/TimerConversions";

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
  left: "-20px",
  width: "50px",
  backgroundColor: "#1e1e1e",
  fontSize: "16px",
};

interface NodeTimerProps {
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
  pxPerSec: () => number;
  id: number;
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
  x: number;
  setX: Dispatch<SetStateAction<number>>;
}

const NodeTimer = ({
  displayTime,
  setDisplayTime,
  id,
  pxPerSec,
  setNodeSettingsAreOpen,
  x,
  setX,
}: NodeTimerProps) => {
  const dispatch = useAppDispatch();
  const skillTimes = useAppSelector((state) => state.skillTime);
  const matchLength = useAppSelector((state) => state.matchLength);

  const IconStyles = {
    cursor: "pointer",
    position: "absolute",
    left: "21px",
    bottom: "25px",
    backgroundColor: "#1e1e1e",
    borderRadius: "5px",
  };

  const timerFormat = /^\d{2}:\d{2}$/;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const seconds = timerToSeconds(e.target.value);
    setDisplayTime(e.target.value);
    if (
      timerFormat.test(e.target.value) &&
      seconds >= 0 &&
      seconds <= matchLength
    ) {
      const newTime = skillTimes.map((skillTime, i) => {
        if (i === id) return seconds;
        return skillTime;
      });
      dispatch(setSkillTime(newTime));
      setX(0);
    }
  };

  const handleMouseUp = () => {
    const newTime = skillTimes.map((skillTime, i) => {
      if (i === id) return Math.floor(skillTimes[id] + x / pxPerSec());
      return skillTime;
    });
    dispatch(setSkillTime(newTime));
    setX(0);
  };

  return (
    <ClickAwayListener onClickAway={() => setNodeSettingsAreOpen(false)}>
      <Box>
        <FormControl sx={{ position: "absolute", top: "-34px" }}>
          <InputBase
            value={displayTime}
            onChange={handleChange}
            sx={inputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
                width: "100%",
              },
            }}
          />
        </FormControl>
        <OpenWithOutlinedIcon
          className="handle"
          color="primary"
          fontSize="small"
          sx={IconStyles}
          onMouseUp={handleMouseUp}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default NodeTimer;
