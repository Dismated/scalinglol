import { Box, ClickAwayListener } from "@mui/material";
import Draggable, { DraggableEvent } from "react-draggable";
import { useContext, useEffect, useRef, useState } from "react";
import { LineWidthPercentageContext } from "../contexts/LineWidthPercentageContext";
import NodeOrientation from "./NodeOrientation";
import { WindowWidthContext } from "../contexts/WindowWidthContext";
import { secondsToTimer } from "../helpers/TimerConversions";

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

  const [timerIsOpen, setTimerIsOpen] = useState(false);
  const [time, setTime] = useState((matchLength / nodeNum) * id);
  const [displayTime, setDisplayTime] = useState(secondsToTimer(time));
  const [x, setX] = useState(0);
  const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

  const nodeRef = useRef(null);

  const startOfTheLineX = -5 - nodeSide * id;

  const containerWidth = () => {
    if (windowWidth >= maxContainerWidth) return maxContainerWidth;
    if (windowWidth >= 600) return windowWidth - 48;
    return windowWidth - 32;
  };

  const lineWidth = () => (containerWidth() * lineWidthPercentage) / 100;

  const pxPerSec = () => lineWidth() / matchLength;

  useEffect(() => {
    setX(xToWindowWidthRatio * windowWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  const handleDrag = (
    event: DraggableEvent,
    dragElement: {
      x: number;
    }
  ): void => {
    setXToWindowWidthRatio(x / windowWidth);
    setX(dragElement.x);
    setDisplayTime(secondsToTimer(time + dragElement.x / pxPerSec()));
  };

  const nodePrimaryPositionX = () => startOfTheLineX + time * pxPerSec();

  const boxStyles = {
    left: nodePrimaryPositionX(),
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
                setTime={setTime}
                orientation={orientation}
                setX={setX}
                displayTime={displayTime}
                setDisplayTime={setDisplayTime}
              />
            ) : (
              <NodeOrientation
                offsetBottom={13}
                offsetTimer={29}
                offsetMoveIcon={-40}
                flexDirection="column-reverse"
                timerIsOpen={timerIsOpen}
                nodeSide={nodeSide}
                setTime={setTime}
                orientation={orientation}
                setX={setX}
                displayTime={displayTime}
                setDisplayTime={setDisplayTime}
              />
            )}
          </Box>
        </Draggable>
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
