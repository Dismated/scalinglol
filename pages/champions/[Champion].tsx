import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import Combo from "../../components/Combo";
import ComponentAdding from "../../components/ComponentAdding";
import WindowWidthProvider from "../../contexts/WindowWidthContext";
import useWindowSize from "../../hooks/useWindowSize";

const ChampionDetails = () => {
  const router = useRouter();
  const { Champion } = router.query;

  const windowWidth = useWindowSize();

  return (
    <Container>
      <Button>
        <Link href="/">
          <a>{"<--Back"}</a>
        </Link>
      </Button>
      <Typography variant="h3">{Champion}</Typography>
      <WindowWidthProvider value={windowWidth?.width}>
        <>
          <Combo champion={Champion} />
          <ComponentAdding heading="Attack" component="slider" />
          <ComponentAdding heading="Defence" component="slider" />
          <ComponentAdding heading="Graphs" component="graph" />
        </>
      </WindowWidthProvider>
    </Container>
  );
};
export default ChampionDetails;
