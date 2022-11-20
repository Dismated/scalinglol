import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setAttackSwitch } from "../reducers/attackSwitchReducer";
import { setDefenceSwitch } from "../reducers/defenceSwitchReducer";

import LineChart from "./LineChart";
import MultiNodeSlider from "./MultiNodeSlider";

const buttonStyles = {
  borderWidth: "1px",
  borderColor: "inherit",
  borderStyle: "dashed",
  marginTop: "10px",
  height: "50px",
  width: "100%",
};

interface ComponentAddingProps {
  heading: "Attack" | "Defence" | "Graphs";
  component: "slider" | "graph";
  champion: string;
}

const ComponentAdding = ({
  heading,
  component,
  champion,
}: ComponentAddingProps) => {
  const [arr, setArr] = useState<number[]>([0]);
  const dispatch = useAppDispatch();
  const switchValue = useAppSelector((state) => {
    if (heading === "Attack") return state.attackSwitch;
    return state.defenceSwitch;
  });

  const setSwitchValue =
    heading === "Attack" ? setAttackSwitch : setDefenceSwitch;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    dispatch(setSwitchValue(newValue));
  };

  return (
    <>
      <Typography variant="h4" sx={{ display: "inline-block" }}>
        {heading}
      </Typography>
      {component === "slider" ? (
        <ToggleButtonGroup
          color="primary"
          size="small"
          exclusive
          onChange={handleChange}
          value={switchValue}
          sx={{
            display: "inline-block",
            float: "right",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "primary.main",
          }}
        >
          <ToggleButton value="timer">Timer</ToggleButton>
          <ToggleButton value="lvlUp">LvlUp</ToggleButton>
        </ToggleButtonGroup>
      ) : null}
      {arr?.map((e) => {
        if (component === "slider")
          return (
            <Box key={e}>
              <MultiNodeSlider heading={heading} />
              <Button
                onClick={() => setArr(arr.concat(arr[arr.length - 1] + 1))}
                sx={buttonStyles}
              >
                +
              </Button>
            </Box>
          );
        return (
          <Grid container key={e}>
            <Grid item>
              <LineChart champion={champion} />
            </Grid>
            <Grid item>
              <Button
                onClick={() => setArr(arr.concat(arr[arr.length - 1] + 1))}
                sx={buttonStyles}
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
