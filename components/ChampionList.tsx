import { Box, Grid, InputBase, Paper, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChampName } from "../types/types";

const InputBaseStyles = {
  borderStyle: "solid",
  borderColor: "primary",
  borderRadius: "10px",
  borderWidth: "2px",
  width: { xs: "90%", sm: "400px", md: "500px", lg: "600px" },
  height: ["40px", "50px"],
  fontSize: [12, 16],
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
  borderRadius: "5px",
  overflow: "hidden",
};

const ChampionList = ({ champStats }: { champStats: ChampName[] }) => {
  const [filteredChampions, setFilteredChampions] = useState(champStats);

  const filterChampions = useCallback(
    (value: string) => {
      const filteredChamps = value
        ? champStats?.filter(
            (name) =>
              value.toLowerCase() === name.slice(0, value.length).toLowerCase()
          )
        : champStats;

      setFilteredChampions(filteredChamps);
    },
    [champStats]
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
        <InputBase
          sx={InputBaseStyles}
          onChange={(event) => filterChampions(event.target.value)}
          autoFocus
          inputProps={{
            "aria-label": "Filter champions",
          }}
        />
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
          {filteredChampions.map((champName) => (
            <Grid item xs={6} sm={3} md={2} key={champName}>
              <Link href={`/champions/${champName}`}>
                <Box sx={CenterChampsStyles}>
                  <Box sx={ImageStyles}>
                    <Image
                      src={`/icons/champions/${champName}.png`}
                      alt={champName}
                      fill
                      sizes="70px"
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    {champName}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );
};

export default ChampionList;
