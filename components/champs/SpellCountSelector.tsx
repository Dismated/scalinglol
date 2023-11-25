import { Box, InputBase, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { setSpells } from '@reducers/champs/spellsReducer';
import { useAppDispatch, useAppSelector } from '@hooks/preTypedHooks';

const InputStyles = {
    'z-index': 10,
    borderRadius: '5px',
    backgroundColor: 'primary.main',
    width: '60px',
    color: 'background.default',
    fontSize: 16,
    p: '2px',
    mx: '5px',
    my: '10px',
};

const SpellCountSelector = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('common');
    const spells = useAppSelector((state) => state.spells);
    const newSpells = spells.map((e) => {
        const newE = { ...e };
        return newE;
    });

    const handleCountChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        newSpells[id].count = Number(e.target.value);
        dispatch(setSpells(newSpells));
    };

    return (
        <Box
            sx={{
                display: 'inline-block',
            }}
        >
            <Typography
                variant='body2'
                sx={{ display: 'inline-block', color: 'primary.main' }}
            >
                {t('champPage.popupContainer.count')}
            </Typography>
            <InputBase
                onChange={handleCountChange}
                sx={InputStyles}
                inputProps={{
                    style: {
                        textAlign: 'center',
                        width: '100%',
                    },
                }}
            />
        </Box>
    );
};

export default SpellCountSelector;
