import { Badge, Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import { useAppSelector } from '@hooks/preTypedHooks';

const SlotButtonStyles = {
    width: '80px',
    height: '115px',
    padding: 0,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'primary.main',
    borderRadius: '4px',
    display: 'inline-block',
};
const SlotBoxStyles = {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    height: '100%',
};
const SpellSectionBoxStyles = {
    height: '35px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const BadgeStyles = {
    '& .MuiBadge-badge': {
        fontFamily: 'Merriweather',
        fontSize: 16,
    },
};

interface SlotProps {
    id: number;
    setSlotPressed: Dispatch<SetStateAction<number>>;
}

const Slot = ({ id, setSlotPressed }: SlotProps) => {
    const champStats = useAppSelector((state) => state.champStats);
    const spells = useAppSelector((state) => state.spells);

    const slotSpell = champStats.spells[spells[id].name];
    const linkName = slotSpell.name === 'A' ? 'BasicAttack' : champStats.name;
    const iconLink = slotSpell.name === 'P' ? 'passives' : 'spells';

    return (
        <Box sx={{ display: 'inline-block', mr: '30px' }}>
            <Badge
                badgeContent={slotSpell.name}
                color='primary'
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={BadgeStyles}
            >
                <Badge
                    badgeContent={spells[id].count}
                    color='primary'
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={BadgeStyles}
                >
                    <Button
                        sx={SlotButtonStyles}
                        onClick={() => {
                            setSlotPressed(id);
                        }}
                    >
                        <Box sx={SlotBoxStyles}>
                            <Image
                                src={`/icons/${iconLink}/${linkName}${slotSpell.name}.png`}
                                alt={slotSpell.name}
                                width='80'
                                height='80'
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                }}
                            />
                            <Box sx={SpellSectionBoxStyles}>
                                <Typography>
                                    {slotSpell.variant[spells[id].section].name}
                                </Typography>
                            </Box>
                        </Box>
                    </Button>
                </Badge>
            </Badge>
        </Box>
    );
};

export default Slot;
