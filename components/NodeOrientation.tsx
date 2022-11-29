import { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";

import Arrow from "./Arrow";
import NodeButton from "./NodeButton";
import NodeLvlUp from "./NodeLvlUp";
import NodeTimer from "./NodeTimer";
import { useAppSelector } from "../hooks/preTypedHooks";

interface NodeOrientationProps {
  offsetTimer: number;
  offsetMoveIcon: number;
  nodeSettingsAreOpen: boolean;
  nodeSide: number;
  x: number;
  setX: Dispatch<SetStateAction<number>>;
  pxPerSec: () => number;
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
  id: number;
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
}

const BoxStyles = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const NodeOrientation = ({
  offsetTimer,
  offsetMoveIcon,
  nodeSettingsAreOpen,
  nodeSide,
  x,
  setX,
  pxPerSec,
  displayTime,
  setDisplayTime,
  id,
  setNodeSettingsAreOpen,
}: NodeOrientationProps) => {
  const [lvlUped, setLvlUped] = useState("");
  const switchValue = useAppSelector((state) => state.attackSwitch);

  return (
    <Box sx={BoxStyles}>
      <Box sx={{ position: "absolute" }}>
        {switchValue === "timer" && nodeSettingsAreOpen ? (
          <NodeTimer
            offsetTimer={offsetTimer}
            offsetMoveIcon={offsetMoveIcon}
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            x={x}
            setX={setX}
            pxPerSec={pxPerSec}
            id={id}
            setNodeSettingsAreOpen={setNodeSettingsAreOpen}
          />
        ) : null}
        {switchValue === "lvlUp" && nodeSettingsAreOpen ? (
          <NodeLvlUp
            setNodeSettingsAreOpen={setNodeSettingsAreOpen}
            lvlUped={lvlUped}
            setLvlUped={setLvlUped}
            id={id}
          />
        ) : null}
      </Box>
      <NodeButton nodeSide={nodeSide} lvlUped={lvlUped} id={id} />
      <Arrow />
    </Box>
  );
};
export default NodeOrientation;
