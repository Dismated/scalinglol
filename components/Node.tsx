import { Box, ClickAwayListener } from "@mui/material";
import Draggable, { DraggableEvent } from "react-draggable";
import { useEffect, useRef, useState } from "react";

import { secondsToTimer, timerToSeconds } from "../helpers/TimerConversions";
import NodeOrientation from "./NodeOrientation";
import { useAppSelector } from "../hooks/preTypedHooks";

const nodeSide = 20;
const maxContainerWidth = 1200;

const Node = ({ id }: { id: number }) => {
  const windowWidth = useAppSelector((state) => state.windowWidth);
  const matchLength = timerToSeconds(
    useAppSelector((state) => state.matchLength)
  );
  const skillTime = useAppSelector((state) => state.skillTime);

  const [nodeSettingsAreOpen, setNodeSettingsAreOpen] = useState(false);
  const [displayTime, setDisplayTime] = useState(secondsToTimer(skillTime[id]));
  const [x, setX] = useState(0);
  const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

  const nodeRef = useRef(null);

  const startOfTheLineX = -5 - nodeSide * id;

  const containerWidth = () => {
    if (windowWidth >= maxContainerWidth) return maxContainerWidth - 30;
    if (windowWidth >= 900) return windowWidth - 48 - 30;
    if (windowWidth >= 600) return windowWidth - 32 - 30;
    return windowWidth;
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
    setDisplayTime(secondsToTimer(skillTime[id] + dragElement.x / pxPerSec()));
  };

  const nodePrimaryPositionX = () =>
    startOfTheLineX + skillTime[id] * pxPerSec();

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
            <NodeOrientation
              offsetTimer={-27}
              offsetMoveIcon={18}
              nodeSettingsAreOpen={nodeSettingsAreOpen}
              nodeSide={nodeSide}
              x={x}
              setX={setX}
              pxPerSec={pxPerSec}
              displayTime={displayTime}
              setDisplayTime={setDisplayTime}
              id={id}
              setNodeSettingsAreOpen={setNodeSettingsAreOpen}
            />
          </Box>
        </Draggable>
      </Box>
    </ClickAwayListener>
  );
};

export default Node;
