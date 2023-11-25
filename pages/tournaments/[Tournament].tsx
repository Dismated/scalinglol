import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import Link from 'next/link';
import MultiLine from '@components/esports/MultiLine';
import clientPromise from '../../lib/mongodb';

const TournamentDetails = ({ teams }: { teams: string }) => {
    const parsed: {
        blue: string;
        red: string;
        goldB: [number, number][];
        goldR: [number, number][];
    } = JSON.parse(teams);
    return (
        <>
            {parsed.map(
                (team: {
                    blue: string;
                    red: string;
                    goldB: [number, number][];
                    goldR: [number, number][];
                }) => {
                    const key = uuidv4();
                    return (
                        <Box key={key}>
                            <Link href={`/matches/${''}`}>
                                {team.blue} vs {team.red}
                            </Link>
                        </Box>
                    );
                },
            )}
            <MultiLine
                data={{
                    width: 928,
                    height: 600,
                    marginTop: 20,
                    marginRight: 20,
                    marginBottom: 30,
                    marginLeft: 30,
                    voronoi: false,
                    team: parsed,
                }}
            />
        </>
    );
};

export const getServerSideProps = async ({
    params,
}: {
    params: { Tournament: string };
}) => {
    console.log(params);

    const { Tournament } = params;
    const client = await clientPromise;
    const db = client.db('mydb');
    const teams = await db
        .collection('statsGame')
        .find({ tournament: Tournament })
        .project({ _id: 0, blue: 1, red: 1, goldB: 1, goldR: 1 })
        .toArray();
    return { props: { teams: JSON.stringify(teams) } };
};

export default TournamentDetails;