import 'chart.js/auto';
import 'chartjs-adapter-moment';
import {
    LvlUpableSpellName,
    LvlsType,
    SpellStats,
} from '@customTypes/customTypes';
import { Paper, Typography } from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import { secondsToTimer } from '@helpers/TimerConversions';
import { useAppSelector } from '@hooks/preTypedHooks';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import spellDmg from '@calculations/calculations';

const PaperStyles = {
    maxWidth: '1200px',
    borderRadius: [0, '30px'],
    pl: [0, '15px'],
    pt: '5px',
};

const upgradesLvlZero: LvlsType[] = new Array(18).fill({
    Q: 0,
    W: 0,
    E: 0,
    R: 0,
});

const Chart = () => {
    const { skillTime, spells, lvlUp, matchLength, champStats } =
        useAppSelector((state) => state);
    const skillTimeCopy = [...skillTime];
    const theme = useTheme();
    const { t } = useTranslation('common');

    const upgradesPerLvl = upgradesLvlZero.map((lvl, lvlIndex) => {
        const newLvl = { ...lvl };
        return lvlUp.reduce((acc, skill, skillIndex) => {
            if (lvlIndex >= skillIndex) {
                newLvl[skill] += 1;
            }
            return newLvl;
        }, newLvl);
    });

    const dmg = upgradesPerLvl.map((skillLvls, lvl) =>
        spells.reduce((acc, spell) => {
            const statsShort = { ...champStats.stats };
            const spellStats: SpellStats =
                champStats.spells[spell.name].variant[spell.section].stats;
            const lvlUpableSpells = champStats.spells[spell.name]
                .name as LvlUpableSpellName;

            return (
                acc +
                spellDmg({
                    ...spellStats,
                    skillLvl: skillLvls[lvlUpableSpells],
                    champLvl: lvl,
                    ad: statsShort.attackdamage,
                    count: spell.count,
                })
            );
        }, 0),
    );

    const enemyHp = [
        11, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300,
        1400, 1500, 1600, 1700,
    ];

    const times = skillTimeCopy.sort((a: number, b: number) => a - b);

    const timesMs = times.map((seconds) => seconds * 1000);

    return (
        <Paper sx={PaperStyles}>
            <Typography variant='h4'>
                {t('champPage.chartContainer.header')}
            </Typography>
            <Scatter
                data={{
                    labels: timesMs,

                    datasets: [
                        {
                            label: `${t('champPage.chartContainer.dmg')}`,
                            data: dmg,
                            stepped: 'before',
                            borderColor: theme.palette.primary.main,
                            pointRadius: 2,
                            pointBorderWidth: 4,
                            borderWidth: 1,
                        },
                        {
                            label: `${t('champPage.chartContainer.enemyHp')}`,
                            data: enemyHp,
                            stepped: 'before',
                            borderColor: 'black',
                            pointRadius: 2,
                            pointBorderWidth: 4,
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'second',
                                displayFormats: { second: 'mm:ss' },
                            },
                            grid: { color: '#424242' },
                            max: matchLength * 1000,
                        },
                        y: { grid: { color: '#424242' }, beginAtZero: true },
                    },
                    showLine: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (milliseconds) =>
                                    `time: ${secondsToTimer(
                                        milliseconds.parsed.x / 1000,
                                    )}, dmg: ${milliseconds.parsed.y}`,
                            },
                        },
                    },
                }}
            />
        </Paper>
    );
};

export default Chart;
