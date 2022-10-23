import { Box, ClickAwayListener } from "@mui/material";
import Draggable, { DraggableEvent } from "react-draggable";
import { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { LineWidthPercentageContext } from "../contexts/LineWidthPercentageContext";
import NodeOrientation from "./NodeOrientation";
import { WindowWidthContext } from "../contexts/WindowWidthContext";

const nodeSide = 20;
const maxContainerWidth = 1200;
interface NodeProps {
  orientation: "up" | "down";
  id: number;
  nodeNum: number;
}

const Node = ({ ...rest }: NodeProps) => {
  const lineWidthPercentage = useContext(LineWidthPercentageContext);
  const windowWidth = useContext(WindowWidthContext) || 0;
  const [timerIsOpen, setTimerIsOpen] = useState(false);
  const [x, setX] = useState(0);
  const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

  useEffect(() => {
    setX(xToWindowWidthRatio * windowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  const handleDrag = (
    event: DraggableEvent,
    dragElement: {
      x: SetStateAction<number>;
    }
  ): void => {
    setXToWindowWidthRatio(x / windowWidth);
    setX(dragElement.x);
  };
  const nodeRef = useRef(null);

  const nodePrimaryPositionX = (lineWidth: number) =>
    -5 -
    nodeSide * rest.id +
    ((lineWidth * (lineWidthPercentage - 1)) / 100 / rest.nodeNum) * rest.id;

  const boxStyles = {
    left: {
      xs: nodePrimaryPositionX(windowWidth - 32),
      sm: nodePrimaryPositionX(windowWidth - 48),
      lg: nodePrimaryPositionX(maxContainerWidth),
    },
    position: "relative",
    display: "inline-block",
  };

  return (
    <ClickAwayListener onClickAway={() => setTimerIsOpen(false)}>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <Box sx={{ display: "inline-block" }}>
        <Draggable
          axis="x"
          handle=".handle"
          onDrag={handleDrag}
          position={{ x, y: 0 }}
          nodeRef={nodeRef}
        >
          <Box
            onClick={() => setTimerIsOpen(true)}
            sx={boxStyles}
            ref={nodeRef}
          >
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
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
