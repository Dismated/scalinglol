import { Box, Grid, InputBase, Paper, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChampNameType } from "../types/types";
import stats from "../champStats/champStats.json";

const champStats: ChampNameType = { ...stats };
const champNamesArr = Object.values(champStats).map((e) => ({
  name: e.name,
  available: e.available,
}));

const InputBaseStyles = {
  borderStyle: "solid",
  borderColor: "primary",
  borderRadius: "10px",
  borderWidth: "2px",
  width: "600px",
  height: "50px",
  px: "15px",
};

interface FilteredType {
  name: string;
  available: boolean;
}

const ChampionList = () => {
  const [filtered, setFiltered] = useState<FilteredType[] | never[]>(
    champNamesArr
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filteredChamps = event.target.value
      ? champNamesArr?.filter(
          (e) =>
            event.target.value.toLowerCase() ===
            e.name.slice(0, event.target.value.length).toLowerCase()
        )
      : champNamesArr;

    setFiltered(filteredChamps);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <InputBase sx={InputBaseStyles} onChange={handleChange} autoFocus />
      </Box>
      <Paper>
        <Grid
          container
          columns={16}
          spacing={3}
          sx={{
            mt: "25px",
          }}
        >
          {filtered.map((c) => (
            <Grid item xs={2} key={c.name}>
              <Link href={`/champions/${c.name}`}>
                <a>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={`/championIcons/${c.name}.png`}
                      alt={c.name}
                      width="70"
                      height="70"
                      style={{
                        filter: `${
                          c.available ? "grayscale(0%)" : "grayscale(100%)"
                        }`,
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                      {c.name}
                    </Typography>
                  </Box>
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default ChampionList;
