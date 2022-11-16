import { Box, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

import Arrow from "./Arrow";
import NodeButton from "./NodeButton";
import { timerToSeconds } from "../helpers/TimerConversions";

interface NodeOrientationProps {
  offsetBottom: number;
  offsetTimer: number;
  offsetMoveIcon: number;
  orientation: "up" | "down";
  flexDirection: "column" | "column-reverse";
  timerIsOpen: boolean;
  nodeSide: number;
  setTime: Dispatch<SetStateAction<number>>;
  setX: Dispatch<SetStateAction<number>>;
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
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
  setTime,
  setX,
  displayTime,
  setDisplayTime,
}: NodeOrientationProps) => {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDisplayTime(event.target.value);
    if (/^\d{2}:\d{2}$/.test(event.target.value)) {
      setTime(timerToSeconds(event.target.value));
      setX(0);
    }
  };

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
