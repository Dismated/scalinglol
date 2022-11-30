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
  offsetTimer: number;
  offsetMoveIcon: number;
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
  x: number;
  setX: Dispatch<SetStateAction<number>>;
  pxPerSec: () => number;
  id: number;
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
}

const NodeTimer = ({
  offsetTimer,
  displayTime,
  setDisplayTime,
  offsetMoveIcon,
  x,
  setX,
  id,
  pxPerSec,
  setNodeSettingsAreOpen,
}: NodeTimerProps) => {
  const dispatch = useAppDispatch();
  const skillTime = useAppSelector((state) => state.skillTime);

  const IconStyles = {
    cursor: "pointer",
    position: "absolute",
    left: "21px",
    bottom: `${offsetMoveIcon}px`,
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDisplayTime(event.target.value);
    if (/^\d{2}:\d{2}$/.test(event.target.value)) {
      const newTime = skillTime.map((e, i) => {
        if (i === id) return timerToSeconds(event.target.value);
        return e;
      });
      dispatch(setSkillTime(newTime));
      setX(0);
    }
  };

  const handleMouseUp = () => {
    const newTime = skillTime.map((e, i) => {
      if (i === id) return Math.floor(skillTime[id] + x / pxPerSec());
      return e;
    });
    dispatch(setSkillTime(newTime));
    setX(0);
  };

  const handleClickAway = () => {
    setNodeSettingsAreOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <FormControl sx={{ position: "absolute", top: `${offsetTimer}px` }}>
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
