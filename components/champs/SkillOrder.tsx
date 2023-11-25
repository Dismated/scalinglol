import { Box, Button, Paper } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { setLvlUp } from '@reducers/champs/lvlUpReducer';
import { useAppDispatch, useAppSelector } from '@hooks/preTypedHooks';
import updateLvls, { lvlUpPatterns } from '@helpers/UpdateLvls';

interface SkillOrderType {
    name: 'Q' | 'W' | 'E';
    order: number;
}

const SkillOrder = ({
    setSkillsLvlUped,
}: {
    setSkillsLvlUped: Dispatch<SetStateAction<boolean>>;
}) => {
    const defaultSkillOrder: SkillOrderType[] = [
        { name: 'Q', order: 0 },
        { name: 'W', order: 0 },
        { name: 'E', order: 0 },
    ];

    const [skillOrders, setSkillOrders] = useState(defaultSkillOrder);
    const lvlUp = useAppSelector((state) => state.lvlUp);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const handleButtonClick = (i: number) => {
        const newSkillOrders = [...skillOrders];
        let add = 1;

        const currentNumber = skillOrders.reduce((acc, skillOrder) => {
            if (skillOrder.order > acc) return skillOrder.order;
            return acc;
        }, 0);

        if (skillOrders[i].order) {
            newSkillOrders[i].order = 0;
            add = -1;
        } else {
            newSkillOrders[i].order = currentNumber + 1;
        }

        const newLvlUps = updateLvls(
            skillOrders[i].name,
            lvlUpPatterns[currentNumber],
            lvlUp,
        );

        dispatch(setLvlUp(newLvlUps));
        setSkillOrders(newSkillOrders);

        if (currentNumber === 2 && add === 1) setSkillsLvlUped(true);
    };

    const generateButtons = () =>
        skillOrders.map((skillOrder, i) => {
            const borderStyle = skillOrder.order ? 'solid' : 'dashed';
            const buttonName = skillOrder.order || skillOrder.name;

            return (
                <Button
                    key={skillOrder.name}
                    sx={{
                        fontSize: '48px',
                        borderStyle,
                        borderWidth: '2px',
                        p: 0,
                        height: '80px',
                        width: '80px',
                    }}
                    onClick={() => handleButtonClick(i)}
                >
                    {buttonName}
                </Button>
            );
        });

    return (
        <Paper
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
        >
            <Box
                sx={{
                    width: '100%',
                    textAlign: 'center',
                    pt: '5px',
                    fontSize: ['24px', '36px'],
                    fontFamily: 'Karla',
                }}
            >
                {t('champPage.skillsContainer.pickSkillOrder')}
            </Box>
            <Box sx={{ display: 'flex', gap: '20px', py: '10px' }}>
                {generateButtons()}
            </Box>
        </Paper>
    );
};

export default SkillOrder;
