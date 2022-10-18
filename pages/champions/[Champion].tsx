import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import ComponentAdding from "../../components/ComponentAdding";

const ChampionDetails = () => {
  const router = useRouter();
  const { Champion } = router.query;

  return (
    <Container>
      <Button>
        <Link href="/">
          <a>{"<--Back"}</a>
        </Link>
      </Button>
      <Typography variant="h3">{Champion}</Typography>
      <ComponentAdding heading="Attack" component="slider" />
      <ComponentAdding heading="Defence" component="slider" />
      <ComponentAdding heading="Graphs" component="slider" />
    </Container>
  );
};
export default ChampionDetails;
