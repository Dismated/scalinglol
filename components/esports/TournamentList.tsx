import { Container } from '@mui/material';
import Link from 'next/link';

const Tournaments = ({ tournaments }: { tournaments: string[] }) => {
    console.log(tournaments, 'lol');

    return (
        <Container>
            {tournaments.map((tourney) => (
                <Link key={tourney} href={`tournaments/${tourney}`}>
                    {tourney}
                </Link>
            ))}
        </Container>
    );
};

export default Tournaments;
