import { Box, Button, ClickAwayListener } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { LvlUpableSpellName, SpellName } from '@customTypes/customTypes';
import { setLvlUp } from '@reducers/champs/lvlUpReducer';
import { useAppDispatch, useAppSelector } from '@hooks/preTypedHooks';

const buttonStyles = {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'primary.main',
    padding: 0,
    minWidth: '25px',
    backgroundColor: '#1e1e1e',
};

interface NodeLvlUpProps {
    setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
    id: number;
}

const NodeLvlUp = ({ setNodeSettingsAreOpen, id }: NodeLvlUpProps) => {
    const spellNames: LvlUpableSpellName[] = ['Q', 'W', 'E', 'R'];
    const dispatch = useAppDispatch();
    const lvlUps = useAppSelector((state) => state.lvlUp);

    const boxStyles = {
        position: 'absolute',
        width: '100px',
        bottom: 0,
        left: '-46px',
    };

    const handleClick = (spellName: SpellName) => {
        dispatch(
            setLvlUp(
                lvlUps.map((lvlUp, i) => {
                    if (i === id) return spellName;
                    return lvlUp;
                }),
            ),
        );
    };

    return (
        <ClickAwayListener onClickAway={() => setNodeSettingsAreOpen(false)}>
            <Box>
                <Box sx={boxStyles}>
                    {spellNames.map((spellName) => (
                        <Button
                            key={spellName}
                            sx={buttonStyles}
                            onClick={() => handleClick(spellName)}
                        >
                            {spellName}
                        </Button>
                    ))}
                </Box>
            </Box>
        </ClickAwayListener>
    );
};

export default NodeLvlUp;
