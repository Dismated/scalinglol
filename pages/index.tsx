import { Box, Container, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { ChampName, ChampionType } from '@customTypes/customTypes';
import ChampionList from '@components/champs/ChampionList';
import stats from '@champStats/champStats.json';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

const TypographyStyles = {
    textAlign: 'center',
    position: 'relative',
    'z-index': 10,
};

interface HomeProps {
    champStatsSorted: ChampName[];
    _props: InferGetStaticPropsType<typeof getStaticProps>;
}

const Home: NextPage<HomeProps> = ({ champStatsSorted }) => {
    const { t } = useTranslation('common');

    return (
        <Container sx={{ p: [0, '16px', '24px'] }}>
            <Box
                sx={{
                    left: 0,
                    width: '100%',
                }}
            >
                <Link href='/eSports'>eSports</Link>
                <Typography variant='h1' sx={TypographyStyles}>
                    {t('mainPage.header')}
                </Typography>
            </Box>

            <ChampionList champStats={champStatsSorted} />
        </Container>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const champStats = { ...stats } as ChampionType;
    const champStatsSorted: ChampName[] = Object.values(champStats).map(
        (champion) => champion.name,
    );
    return {
        props: {
            champStatsSorted,
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

export default Home;
