import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";

import Arrow from "./Arrow";
import NodeButton from "./NodeButton";
import NodeLvlUp from "./NodeLvlUp";
import NodeTimer from "./NodeTimer";
import { useAppSelector } from "../hooks/preTypedHooks";

interface NodeOrientationProps {
  nodeSettingsAreOpen: boolean;
  pxPerSec: () => number;
  displayTime: string;
  setDisplayTime: Dispatch<SetStateAction<string>>;
  id: number;
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
  x: number;
  setX: Dispatch<SetStateAction<number>>;
}

const BoxStyles = {
  position: "relative",
  display: "flex",
  flexDirection: "column",
};

const NodeOrientation = ({
  id,
  nodeSettingsAreOpen,
  ...rest
}: NodeOrientationProps) => {
  const switchValue = useAppSelector((state) => state.attackSwitch);

  return (
    <Box sx={BoxStyles}>
      <Box sx={{ position: "absolute" }}>
        {switchValue === "timer" && nodeSettingsAreOpen && (
          <NodeTimer {...rest} id={id} />
        )}
        {switchValue === "lvlUp" && nodeSettingsAreOpen && (
          <NodeLvlUp
            setNodeSettingsAreOpen={rest.setNodeSettingsAreOpen}
            id={id}
          />
        )}
      </Box>
      <NodeButton id={id} />
      <Arrow />
    </Box>
  );
};
export default NodeOrientation;
