import { Box, ClickAwayListener } from "@mui/material";
import { useContext, useState } from "react";

import { LineWidthPercentageContext } from "../context/LineWidthPercentageContext";
import NodeOrientation from "./NodeOrientation";

const nodeSide = 20;
const maxContainerWidth = "1200px";

interface NodeProps {
  orientation: "up" | "down";
  id: number;
  nodeNum: number;
}

const Node = ({ orientation, id, nodeNum }: NodeProps) => {
  const lineWidthPercentage = useContext(LineWidthPercentageContext);
  const [openTimer, setOpenTimer] = useState(false);

  const nodePrimaryPositionX = (lineWidth: string) =>
    `calc(-5px - ${nodeSide}px * ${id} + (${lineWidth} * ${
      (lineWidthPercentage - 1) / 100
    } / ${nodeNum}) * ${id})`;

  const boxStyles = {
    left: {
      xs: nodePrimaryPositionX("(100vw - 32px)"),
      sm: nodePrimaryPositionX("(100vw - 48px)"),
      lg: nodePrimaryPositionX(maxContainerWidth),
    },
    position: "relative",
    display: "inline-block",
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenTimer(false)}>
      <Box sx={boxStyles}>
        {orientation === "up" ? (
          <NodeOrientation
            offsetBottom={-13}
            orientation={orientation}
            flexDirection="column"
            openTimer={openTimer}
            nodeSide={nodeSide}
          />
        ) : (
          <NodeOrientation
            offsetBottom={13}
            orientation={orientation}
            flexDirection="column-reverse"
            openTimer={openTimer}
            nodeSide={nodeSide}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
