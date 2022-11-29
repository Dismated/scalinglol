import { Box, Grid, InputBase, Paper, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChampionFront } from "../types/types";

const InputBaseStyles = {
  borderStyle: "solid",
  borderColor: "primary",
  borderRadius: "10px",
  borderWidth: "2px",
  width: { xs: "90%", sm: "400px", md: "500px", lg: "600px" },
  height: ["40px", "50px"],
  px: "15px",
};

const PaperStyles = {
  pb: "20px",
  pl: 0,
  borderRadius: { xs: 0, sm: "30px" },
  mt: { xs: "30px" },
};

const CenterChampsStyles = {
  display: "flex",
  justifyContent: "center",
};

const ImageStyles = {
  position: "relative",
  width: "70px",
  height: "70px",
};

const ChampionList = ({ champStats }: { champStats: ChampionFront[] }) => {
  const [filteredChampions, setFilteredChampions] =
    useState<ChampionFront[]>(champStats);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const filteredChamps = event.target.value
      ? champStats?.filter(
          (e) =>
            event.target.value.toLowerCase() ===
            e.name.slice(0, event.target.value.length).toLowerCase()
        )
      : champStats;

    setFilteredChampions(filteredChamps);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: ["10px", 0] }}>
        <InputBase sx={InputBaseStyles} onChange={handleChange} autoFocus />
      </Box>
      <Paper sx={PaperStyles}>
        <Grid
          container
          columns={18}
          spacing={{ xs: 2 }}
          sx={{
            mt: "25px",
          }}
        >
          {filteredChampions.map((c) => (
            <Grid item xs={6} sm={3} md={2} key={c.name}>
              <Link href={`/champions/${c.name}`}>
                <a>
                  <Box sx={CenterChampsStyles}>
                    <Box sx={ImageStyles}>
                      <Image
                        src={`/icons/champions/${c.name}.png`}
                        alt={c.name}
                        layout="fill"
                        style={{
                          filter: `${
                            c.available ? "grayscale(0%)" : "grayscale(100%)"
                          }`,
                        }}
                      />
                    </Box>
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
