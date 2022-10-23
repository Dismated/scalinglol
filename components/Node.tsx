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
  matchLength: number;
}

const Node = ({ orientation, id, nodeNum, matchLength }: NodeProps) => {
  const lineWidthPercentage = useContext(LineWidthPercentageContext);
  const windowWidth = useContext(WindowWidthContext) || 0;
  const windowWidth32Pad = windowWidth - 32;
  const windowWidth48Pad = windowWidth - 48;

  const [timerIsOpen, setTimerIsOpen] = useState(false);
  const [time, setTime] = useState((matchLength / nodeNum) * id);
  const [x, setX] = useState(0);
  const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

  const nodeRef = useRef(null);

  const startOfTheLineX = -5 - nodeSide * id;

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

  const lineWidth = (containerWidth: number) =>
    (containerWidth * lineWidthPercentage) / 100;

  const pxPerSec = (containerWidth: number) =>
    lineWidth(containerWidth) / matchLength;

  const nodePrimaryPositionX = (containerWidth: number) =>
    startOfTheLineX + time * pxPerSec(containerWidth);

  const boxStyles = {
    left: {
      xs: nodePrimaryPositionX(windowWidth32Pad),
      sm: nodePrimaryPositionX(windowWidth48Pad),
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
            {orientation === "up" ? (
              <NodeOrientation
                offsetBottom={-13}
                offsetTimer={-32}
                offsetMoveIcon={51}
                flexDirection="column"
                timerIsOpen={timerIsOpen}
                nodeSide={nodeSide}
                time={time}
                setTime={setTime}
                orientation={orientation}
              />
            ) : (
              <NodeOrientation
                offsetBottom={13}
                offsetTimer={29}
                offsetMoveIcon={-40}
                flexDirection="column-reverse"
                timerIsOpen={timerIsOpen}
                nodeSide={nodeSide}
                time={time}
                setTime={setTime}
                orientation={orientation}
              />
            )}
          </Box>
        </Draggable>
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
