import {
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setAttackSwitch } from "../reducers/attackSwitchReducer";

import MultiNodeSlider from "./MultiNodeSlider";

const ComponentAdding = () => {
  const dispatch = useAppDispatch();
  const switchValue = useAppSelector((state) => state.attackSwitch);
  const heading = "Skills";

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    dispatch(setAttackSwitch(newValue));
  };

  return (
    <Paper sx={{ my: "10px", px: "10px", pb: "10px" }}>
      <Typography variant="h3" sx={{ display: "inline-block" }}>
        {heading}
      </Typography>
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
          mt: "8px",
        }}
      >
        <ToggleButton value="timer">Timer</ToggleButton>
        <ToggleButton value="lvlUp">LvlUp</ToggleButton>
      </ToggleButtonGroup>
      <Divider />

      <MultiNodeSlider />
    </Paper>
  );
};

export default ComponentAdding;
