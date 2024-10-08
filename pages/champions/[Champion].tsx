import { Container } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import { lazy, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { ChampName } from '@customTypes/customTypes';
import { setChampStats } from '@reducers/champs/champStatsReducer';
import { setLvlUp } from '@reducers/champs/lvlUpReducer';
import { setSpells } from '@reducers/champs/spellsReducer';
import { setWindowWidth } from '@reducers/champs/windowWidthReducer';
import { useAppDispatch } from '@hooks/preTypedHooks';
import Combo from '@components/champs/Combo';
import EnemyLvl from '@components/champs/EnemyLvl';
import SkillOrder from '@components/champs/SkillOrder';
import TopRow from '@components/champs/TopRow';
import YourLvl from '@components/champs/YourLvl';
import stats from '@champStats/champStats.json';
import updateLvls, { emptyLvls, lvlUpR } from '@helpers/UpdateLvls';
import useWindowSize from '@hooks/useWindowSize';

const Chart = lazy(() => import('../../components/champs/Chart'));

const ChampionDetails = () => {
    const { query } = useRouter();
    const champion = query.Champion as ChampName;
    const windowWidth = useWindowSize();
    const dispatch = useAppDispatch();
    const [skillsLvlUped, setSkillsLvlUped] = useState(false);

    useEffect(() => {
        dispatch(setWindowWidth(windowWidth));
    }, [dispatch, windowWidth]);

    useEffect(() => {
        dispatch(setChampStats(stats[champion]));
        dispatch(setSpells([]));
        dispatch(setLvlUp(updateLvls('R', lvlUpR, emptyLvls)));
    }, [dispatch, champion]);

    return (
        <>
            <Head>
                <title>{champion}</title>
            </Head>
            <Container sx={{ px: [0, '16px', '24px'] }}>
                <TopRow />
                {skillsLvlUped ? (
                    <YourLvl />
                ) : (
                    <SkillOrder setSkillsLvlUped={setSkillsLvlUped} />
                )}
                <Combo />
                <EnemyLvl />
                <Chart />
            </Container>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.keys(stats).map(
        (champion) => `/champions/${champion}`,
    );
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});

export default ChampionDetails;
