import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

import LineChart from "./LineChart";
import MultiNodeSlider from "./MultiNodeSlider";

interface ComponentAddingProps {
  heading: string;
  component: "slider" | "graph";
}

const ComponentAdding = ({ heading, component }: ComponentAddingProps) => {
  const [arr, setArr] = useState<number[]>([0]);

  return (
    <>
      <Typography variant="h4">{heading}</Typography>
      {arr?.map((e) => {
        if (component === "slider")
          return (
            <Box key={e}>
              <MultiNodeSlider />
              <Button
                onClick={() => setArr(arr.concat(arr[arr.length - 1] + 1))}
                sx={{
                  borderWidth: "1px",
                  borderColor: "inherit",
                  borderStyle: "dashed",
                  marginTop: "10px",
                  height: "50px",
                  width: "100%",
                }}
              >
                +
              </Button>
            </Box>
          );
        return (
          <Grid container key={e}>
            <Grid item>
              <LineChart />
            </Grid>
            <Grid item>
              <Button
                onClick={() => setArr(arr.concat(arr[arr.length - 1] + 1))}
                sx={{
                  borderWidth: "1px",
                  borderColor: "inherit",
                  borderStyle: "dashed",
                  marginTop: "10px",
                  height: "50px",
                  width: "100%",
                }}
              >
                +
              </Button>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default ComponentAdding;
