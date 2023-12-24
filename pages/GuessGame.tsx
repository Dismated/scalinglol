const GuessGame: NextPage<GuessGameProps> = () => {
    return (
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
};
export default GuessGame;
