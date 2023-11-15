import { Container } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import GoldGraph from '@components/esports/GoldGraph';
import Head from 'next/head';
import clientPromise from '../lib/mongodb';

interface ESportsProps {
    goldB: [string, string][];
    goldR: [string, string][];
    _props: InferGetStaticPropsType<typeof getStaticProps>;
}

const ESports: NextPage<ESportsProps> = ({ goldB, goldR }) => (
    <>
        <Head>
            <title>eSports</title>
        </Head>
        <Container sx={{ px: [0, '16px', '24px'] }}>
            <GoldGraph goldB={goldB} goldR={goldR} />
        </Container>
    </>
);

// eslint-disable-next-line
export const getStaticProps: GetStaticProps = async () => {
    const client = await clientPromise;
    const db = client.db('mydb');

    const cursor = db.collection('stats').find({});

    const stats = await cursor.toArray();

    const golds = stats.map((match) => [match.goldB, match.goldR]);

    const goldB = golds[0][0].map((second: [string, string]) => second);
    const goldR = golds[0][1].map((second: [string, string]) => second);
    console.log(goldB);
    console.log(goldR);

    return {
        props: { goldB, goldR },
    };
};

export default ESports;
