import { Container } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import GoldGraph from '@components/esports/GoldGraph';
import Head from 'next/head';
import Header from '@components/esports/Header';
import Tournaments from '@components/esports/TournamentList';
import clientPromise from '../lib/mongodb';

interface ESportsProps {
    goldB: [string, string][];
    goldR: [string, string][];
    uniqueTournaments: string[];
    _props: InferGetStaticPropsType<typeof getStaticProps>;
}

const ESports: NextPage<ESportsProps> = ({
    goldB,
    goldR,
    uniqueTournaments,
}) => (
    <>
        <Head>
            <title>eSports</title>
        </Head>
        <Container sx={{ px: [0, '16px', '24px'] }}>
            <Header />
            <Tournaments tournaments={uniqueTournaments} />
            <GoldGraph goldB={goldB} goldR={goldR} />
        </Container>
    </>
);

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
    const client = await clientPromise;
    const db = client.db('mydb');
    const cursor = db.collection('stats').find({});
    const uniqueTournaments = await db
        .collection('statsGame')
        .distinct('tournament');

    const stats = await cursor.toArray();

    const golds = stats.map((match) => [match.goldB, match.goldR]);

    const goldB = golds[0][0].map((second: [string, string]) => second);
    const goldR = golds[0][1].map((second: [string, string]) => second);

    return {
        props: { goldB, goldR, uniqueTournaments },
    };
};

export default ESports;
