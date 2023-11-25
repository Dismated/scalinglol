import { Container } from '@mui/material';
import Link from 'next/link';

const Header = () => {
    return (
        <Container>
            <Link href='/Tournaments'>Tournaments</Link>
            <Link href='/Teams'>Teams</Link>
            <Link href='/Players'>Players</Link>
            <Link href='/Champions'>Champions</Link>
        </Container>
    );
};

export default Header;
