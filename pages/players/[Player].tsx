import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import MultiLine from '@components/esports/MultiLine';
import clientPromise from '../../lib/mongodb';

const PlayerDetails = () => {};

export const getServerSideProps = async ({
    params,
}: {
    params: { Tournament: string };
}) => {
    const { Tournament } = params;
    const client = await clientPromise;
    const db = client.db('mydb');
    const teams = await db
        .collection('statsGame')
        .find({ tournament: Tournament })
        .project({
            _id: 0,
            blue: 1,
            red: 1,
            winner: 1,
            match: 1,
            goldB: 1,
            goldR: 1,
        })
        .toArray();
    return { props: { teams: JSON.stringify(teams) } };
};

export default PlayerDetails;
