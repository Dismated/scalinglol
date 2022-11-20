import { Box, ClickAwayListener } from "@mui/material";
import Draggable, { DraggableEvent } from "react-draggable";
import { useEffect, useRef, useState } from "react";

import { secondsToTimer, timerToSeconds } from "../helpers/TimerConversions";
import NodeOrientation from "./NodeOrientation";
import { useAppSelector } from "../hooks/preTypedHooks";

const nodeSide = 20;
const maxContainerWidth = 1200;

interface NodeProps {
  orientation: "up" | "down";
  id: number;
  heading: "Attack" | "Defence" | "Graphs";
}

const Node = ({ id, orientation, heading }: NodeProps) => {
  const windowWidth = useAppSelector((state) => state.windowWidth);
  const matchLength = timerToSeconds(
    useAppSelector((state) => state.matchLength)
  );
  const itemTime = useAppSelector((state) => state.itemTime);
  const skillTime = useAppSelector((state) => state.skillTime);
  const nodeTimeArr = orientation === "up" ? itemTime : skillTime;

  const [nodeSettingsAreOpen, setNodeSettingsAreOpen] = useState(false);
  const [displayTime, setDisplayTime] = useState(
    secondsToTimer(nodeTimeArr[id])
  );
  const [x, setX] = useState(0);
  const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

  const nodeRef = useRef(null);

  const startOfTheLineX = -5 - nodeSide * id;

  const containerWidth = () => {
    if (windowWidth >= maxContainerWidth) return maxContainerWidth;
    if (windowWidth >= 600) return windowWidth - 48;
    return windowWidth - 32;
  };

  const pxPerSec = () => containerWidth() / matchLength;

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
    setDisplayTime(
      secondsToTimer(nodeTimeArr[id] + dragElement.x / pxPerSec())
    );
  };

  const nodePrimaryPositionX = () =>
    startOfTheLineX + nodeTimeArr[id] * pxPerSec();

  const boxStyles = {
    left: nodePrimaryPositionX,
    position: "relative",
    display: "inline-block",
  };

  return (
    <ClickAwayListener onClickAway={() => setNodeSettingsAreOpen(false)}>
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
            onClick={() => setNodeSettingsAreOpen(true)}
            sx={boxStyles}
            ref={nodeRef}
          >
            {orientation === "up" ? (
              <NodeOrientation
                orientation={orientation}
                offsetTimer={-32}
                offsetMoveIcon={51}
                flexDirection="column"
                nodeSettingsAreOpen={nodeSettingsAreOpen}
                heading={heading}
                nodeSide={nodeSide}
                x={x}
                setX={setX}
                pxPerSec={pxPerSec}
                displayTime={displayTime}
                setDisplayTime={setDisplayTime}
                id={id}
                setNodeSettingsAreOpen={setNodeSettingsAreOpen}
              />
            ) : (
              <NodeOrientation
                orientation={orientation}
                offsetTimer={29}
                offsetMoveIcon={-40}
                flexDirection="column-reverse"
                nodeSettingsAreOpen={nodeSettingsAreOpen}
                heading={heading}
                nodeSide={nodeSide}
                x={x}
                setX={setX}
                pxPerSec={pxPerSec}
                displayTime={displayTime}
                setDisplayTime={setDisplayTime}
                id={id}
                setNodeSettingsAreOpen={setNodeSettingsAreOpen}
              />
            )}
          </Box>
        </Draggable>
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
