import { Box, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

import { secondsToTimer, timerToSeconds } from "../helpers/TimerConversions";
import Arrow from "./Arrow";
import NodeButton from "./NodeButton";

interface NodeOrientationProps {
  offsetBottom: number;
  offsetTimer: number;
  offsetMoveIcon: number;
  orientation: "up" | "down";
  flexDirection: "column" | "column-reverse";
  timerIsOpen: boolean;
  nodeSide: number;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
  left: "-15px",
  width: "40px",
};

const NodeOrientation = ({
  offsetBottom,
  offsetTimer,
  offsetMoveIcon,
  orientation,
  flexDirection,
  timerIsOpen,
  nodeSide,
  time,
  setTime,
}: NodeOrientationProps) => {
  const [displayTime, setDisplayTime] = useState(secondsToTimer(time));
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDisplayTime(event.target.value);
    if (/^\d{2}:\d{2}$/.test(event.target.value))
      setTime(timerToSeconds(event.target.value));
  };

  const handleSubmit = () => {};

  return (
    <Box
      sx={{
        bottom: `${offsetBottom}px`,
        position: "relative",
        display: "flex",
        flexDirection: { flexDirection },
      }}
    >
      {timerIsOpen ? (
        <>
          <FormControl
            sx={{ position: "absolute", top: `${offsetTimer}px` }}
            onSubmit={handleSubmit}
          >
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
            sx={{
              cursor: "pointer",
              position: "absolute",
              left: "16px",
              bottom: `${offsetMoveIcon}px`,
            }}
          />
        </>
      ) : null}
      <NodeButton nodeSide={nodeSide} />
      <Arrow orientation={orientation} />
    </Box>
  );
};
export default NodeOrientation;
