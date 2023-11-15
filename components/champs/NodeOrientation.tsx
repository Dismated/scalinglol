import { Box } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { NodeOptions } from '@customTypes/customTypes';
import Arrow from './Arrow';
import NodeButton from './NodeButton';
import NodeTimer from './NodeTimer';
import YourNodeOptions from './YourNodeOptions';

interface NodeOrientationProps {
    nodeSettingsAreOpen: boolean;
    pxPerSec: () => number;
    displayTime: string;
    setDisplayTime: Dispatch<SetStateAction<string>>;
    id: number;
    setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
    x: number;
    setX: Dispatch<SetStateAction<number>>;
    nodeOptions: NodeOptions;
}

const BoxStyles = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
};

const NodeOrientation = ({
    id,
    nodeSettingsAreOpen,
    nodeOptions,
    ...rest
}: NodeOrientationProps) => (
    <Box sx={BoxStyles}>
        <Box sx={{ position: 'absolute' }}>
            {nodeOptions === 'enemy' ? (
                nodeSettingsAreOpen && <NodeTimer {...rest} id={id} />
            ) : (
                <YourNodeOptions
                    id={id}
                    nodeSettingsAreOpen={nodeSettingsAreOpen}
                    {...rest}
                />
            )}
        </Box>
        <NodeButton id={id} nodeOptions={nodeOptions} />
        <Arrow />
    </Box>
);

export default NodeOrientation;
