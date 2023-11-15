import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@hooks/preTypedHooks';
import NodeLvlUp from './NodeLvlUp';
import NodeTimer from './NodeTimer';

interface YourNodeOptionsProps {
    nodeSettingsAreOpen: boolean;
    pxPerSec: () => number;
    displayTime: string;
    setDisplayTime: Dispatch<SetStateAction<string>>;
    id: number;
    setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
    x: number;
    setX: Dispatch<SetStateAction<number>>;
}

const YourNodeOptions = ({
    id,
    nodeSettingsAreOpen,
    ...rest
}: YourNodeOptionsProps) => {
    const switchValue = useAppSelector((state) => state.attackSwitch);
    return (
        <>
            {switchValue === 'timer' && nodeSettingsAreOpen && (
                <NodeTimer {...rest} id={id} />
            )}
            {switchValue === 'lvlUp' && nodeSettingsAreOpen && (
                <NodeLvlUp
                    setNodeSettingsAreOpen={rest.setNodeSettingsAreOpen}
                    id={id}
                />
            )}
        </>
    );
};

export default YourNodeOptions;
