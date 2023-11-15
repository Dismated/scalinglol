import { Box, ClickAwayListener } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';

import { NodeOptions } from '@customTypes/customTypes';
import { secondsToTimer } from '@helpers/TimerConversions';
import { useAppSelector } from '@hooks/preTypedHooks';
import NodeOrientation from './NodeOrientation';

const maxContainerWidth = 1200;

const Node = ({
    id,
    nodeOptions,
}: {
    id: number;
    nodeOptions: NodeOptions;
}) => {
    const { windowWidth, skillTime, nodeSide, matchLength } = useAppSelector(
        (state) => state,
    );
    const [nodeSettingsAreOpen, setNodeSettingsAreOpen] = useState(false);
    const [x, setX] = useState(0);
    const [displayTime, setDisplayTime] = useState(
        secondsToTimer(skillTime[id]),
    );
    const [xToWindowWidthRatio, setXToWindowWidthRatio] = useState(0);

    const nodeRef = useRef(null);

    const startOfTheLineX = -5 - nodeSide * id;

    const containerWidth = () => {
        if (windowWidth >= maxContainerWidth)
            return maxContainerWidth - 48 - 30;
        if (windowWidth >= 900) return windowWidth - 48 - 30;
        if (windowWidth >= 600) return windowWidth - 32 - 30;
        return windowWidth - 30;
    };

    const pxPerSec = () => containerWidth() / matchLength;

    useEffect(() => {
        setX(xToWindowWidthRatio * windowWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    const handleDrag = (
        e: DraggableEvent,
        dragElement: {
            x: number;
        },
    ): void => {
        setXToWindowWidthRatio(x / windowWidth);
        setX(dragElement.x);
        setDisplayTime(
            secondsToTimer(skillTime[id] + dragElement.x / pxPerSec()),
        );
    };

    const nodePrimaryPositionX = startOfTheLineX + skillTime[id] * pxPerSec();

    const boxStyles = {
        left: `${nodePrimaryPositionX}px`,
        position: 'relative',
        display: 'inline-block',
    };

    return (
        <ClickAwayListener onClickAway={() => setNodeSettingsAreOpen(false)}>
            <Box sx={{ display: 'inline-block' }}>
                <Draggable
                    axis='x'
                    handle='.handle'
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
                            nodeSettingsAreOpen={nodeSettingsAreOpen}
                            setNodeSettingsAreOpen={setNodeSettingsAreOpen}
                            pxPerSec={pxPerSec}
                            displayTime={displayTime}
                            setDisplayTime={setDisplayTime}
                            id={id}
                            x={x}
                            setX={setX}
                            nodeOptions={nodeOptions}
                        />
                    </Box>
                </Draggable>
            </Box>
        </ClickAwayListener>
    );
};

export default Node;
