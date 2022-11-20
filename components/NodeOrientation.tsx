import { Dispatch, SetStateAction, useState } from "react";
import { Box } from "@mui/material";

import Arrow from "./Arrow";
import NodeButton from "./NodeButton";
import NodeLvlUp from "./NodeLvlUp";
import NodeTimer from "./NodeTimer";
import { useAppSelector } from "../hooks/preTypedHooks";

interface NodeOrientationProps {
  orientation: "up" | "down";
  offsetTimer: number;
  offsetMoveIcon: number;
  flexDirection: "column" | "column-reverse";
  nodeSettingsAreOpen: boolean;
  nodeSide: number;
  x: number;
  setX: Dispatch<SetStateAction<number>>;
  pxPerSec: () => number;
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
  id: number;
  heading: "Attack" | "Defence" | "Graphs";
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
}

const NodeOrientation = ({
  orientation,
  offsetTimer,
  offsetMoveIcon,
  flexDirection,
  nodeSettingsAreOpen,
  nodeSide,
  x,
  setX,
  pxPerSec,
  displayTime,
  setDisplayTime,
  id,
  heading,
  setNodeSettingsAreOpen,
}: NodeOrientationProps) => {
  const [lvlUped, setLvlUped] = useState("");
  const switchValue = useAppSelector((state) => {
    if (heading === "Attack") return state.attackSwitch;
    return state.defenceSwitch;
  });

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { flexDirection },
      }}
    >
      {nodeSettingsAreOpen ? (
        switchValue === "timer" ? (
          <NodeTimer
            offsetTimer={offsetTimer}
            offsetMoveIcon={offsetMoveIcon}
            displayTime={displayTime}
            setDisplayTime={setDisplayTime}
            x={x}
            setX={setX}
            pxPerSec={pxPerSec}
            id={id}
            orientation={orientation}
            setNodeSettingsAreOpen={setNodeSettingsAreOpen}
          />
        ) : (
          <NodeLvlUp
            setNodeSettingsAreOpen={setNodeSettingsAreOpen}
            orientation={orientation}
            lvlUped={lvlUped}
            setLvlUped={setLvlUped}
            id={id}
          />
        )
      ) : (
        <Box />
      )}
      <NodeButton nodeSide={nodeSide} lvlUped={lvlUped} id={id} />
      <Arrow orientation={orientation} />
    </Box>
  );
};
export default NodeOrientation;
