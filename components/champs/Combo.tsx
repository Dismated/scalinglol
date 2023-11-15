import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { setPrimaryColor } from '@reducers/primaryColorReducer';
import { setSpells } from '@reducers/spellsReducer';
import { useAppDispatch, useAppSelector } from '@hooks/preTypedHooks';
import CurvedCorner from './CurvedCorner';
import Slot from './Slot';
import SpellPopUp from './SpellPopUp';

const boxStyles = {
    backgroundColor: 'primary.main',
    borderTopRightRadius: [0, '30px'],
    borderBottomLeftRadius: '23px',
    display: 'inline-block',
    pl: '20px',
    pr: ['5px', '15px'],
};

const slotButtonStyles = {
    width: '80px',
    height: '115px',
    padding: 0,
    borderStyle: 'dashed',
    borderWidth: '2px',
    borderColor: 'primary.main',
    borderRadius: '4px',
    display: 'inline-block',
    lineHeight: '1.2',
};

const CurvedCornerStyles = {
    display: 'inline-block',
    bottom: '9px',
    position: 'relative',
};

const TypographyStyles = {
    display: 'inline-block',
    color: '#121212',
};

const Combo = () => {
    const [slotPressed, setSlotPressed] = useState(-1);
    const dispatch = useAppDispatch();
    const champStats = useAppSelector((state) => state.champStats);
    const theme = useTheme();
    const { t } = useTranslation('common');
    const spells = useAppSelector((state) => state.spells);

    useEffect(() => {
        dispatch(setPrimaryColor(champStats.color));
    }, [champStats.color, dispatch]);

    const handleSlotClick = () => {
        dispatch(setSpells([...spells, { name: 0, section: 0, count: 1 }]));
        setSlotPressed(spells.length);
    };

    const generateSlots = (num: number) => {
        const arr = Array.from(Array(num).keys());

        if (spells.length > 0)
            return arr.map((e) => (
                <Slot id={e} key={e} setSlotPressed={setSlotPressed} />
            ));
        return null;
    };

    return (
        <Paper sx={{ borderRadius: [0, '30px'], pl: [0, '15px'] }}>
            <Typography
                variant='h4'
                sx={{ display: 'inline-block', pt: '5px' }}
            >
                {t('champPage.comboContainer.header')}
            </Typography>
            <Box sx={{ display: 'inline-block', float: 'right' }}>
                <Box sx={CurvedCornerStyles}>
                    <CurvedCorner
                        corner='topRight'
                        size={15}
                        frontColor={theme.palette.primary.main}
                        backColor='#1e1e1e'
                    />
                </Box>
                <Box sx={boxStyles}>
                    <Typography variant='h5' sx={TypographyStyles}>
                        {t('champPage.comboContainer.slots')}: {spells.length}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ py: '10px' }}>
                {generateSlots(spells.length)}
                <Button sx={slotButtonStyles} onClick={handleSlotClick}>
                    {t('champPage.comboContainer.addSpell')}
                </Button>
            </Box>
            {slotPressed >= 0 && (
                <SpellPopUp setSlotPressed={setSlotPressed} id={slotPressed} />
            )}
        </Paper>
    );
};

export default Combo;
