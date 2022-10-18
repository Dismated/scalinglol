import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ChampionList = () => {
  const [champion, setChampion] = useState([]);

  useEffect(() => {
    async function getChampion() {
      const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
      );
      const champions = await response.json();
      setChampion(champions.data);
    }
    getChampion();
  }, []);

  return (
    <Grid container sx={{ mt: "100px" }}>
      {Object.values(champion).map((c: any) => (
        <Grid item xs={3} key={c.key}>
          <Link href={`/champions/${c.name}`}>
            <a>
              <Image
                src={`http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/${c.image.full}`}
                alt={c.name}
                width="50"
                height="50"
              />
              <Typography variant="h6">{c.name}</Typography>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChampionList;
