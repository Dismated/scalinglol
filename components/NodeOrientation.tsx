import { Box, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, useContext, useState } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

import { secondsToTimer, timerToSeconds } from "../helpers/TimerAndSeconds";
import Arrow from "./Arrow";
import { MatchLengthContext } from "../contexts/MatchLengthContext";
import NodeButton from "./NodeButton";
import { WindowWidthContext } from "../contexts/WindowWidthContext";

type NodeOrientationProps = {
  offsetBottom: number;
  offsetTimer: number;
  offsetMoveIcon: number;
  orientation: "up" | "down";
  flexDirection: "column" | "column-reverse";
  timerIsOpen: boolean;
  nodeSide: number;
  nodeNum: number;
  id: number;
};

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
  nodeNum,
  id,
}: NodeOrientationProps) => {
  const matchLength = useContext(MatchLengthContext);
  const [time, setTime] = useState(
    secondsToTimer((timerToSeconds(matchLength) / nodeNum) * id)
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTime(event.target.value);
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
              value={time}
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
