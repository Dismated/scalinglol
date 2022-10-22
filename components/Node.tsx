import { Box, ClickAwayListener } from "@mui/material";
import { useContext, useState } from "react";
import Draggable from "react-draggable";
import { LineWidthPercentageContext } from "../contexts/LineWidthPercentageContext";
import NodeOrientation from "./NodeOrientation";

const nodeSide = 20;
const maxContainerWidth = "1200px";
interface NodeProps {
  orientation: "up" | "down";
  id: number;
  nodeNum: number;
}

const Node = ({ ...rest }: NodeProps) => {
  const lineWidthPercentage = useContext(LineWidthPercentageContext);
  const [timerIsOpen, setTimerIsOpen] = useState(false);

  const nodePrimaryPositionX = (lineWidth: string) =>
    `calc(-5px - ${nodeSide}px * ${rest.id} + (${lineWidth} * ${
      (lineWidthPercentage - 1) / 100
    } / ${rest.nodeNum}) * ${rest.id})`;

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
    <ClickAwayListener onClickAway={() => setTimerIsOpen(false)}>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>
        <Draggable axis="x" handle=".handle">
          <Box onClick={() => setTimerIsOpen(true)} sx={boxStyles}>
            {rest.orientation === "up" ? (
              <NodeOrientation
                offsetBottom={-13}
                offsetTimer={-32}
                offsetMoveIcon={51}
                flexDirection="column"
                timerIsOpen={timerIsOpen}
                nodeSide={nodeSide}
                {...rest}
              />
            ) : (
              <NodeOrientation
                offsetBottom={13}
                offsetTimer={29}
                offsetMoveIcon={-40}
                flexDirection="column-reverse"
                timerIsOpen={timerIsOpen}
                nodeSide={nodeSide}
                {...rest}
              />
            )}
          </Box>
        </Draggable>
      </>
    </ClickAwayListener>
  );
};

export default Node;
