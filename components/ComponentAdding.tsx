import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

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
    <>
      <Typography variant="h4" sx={{ display: "inline-block" }}>
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
        }}
      >
        <ToggleButton value="timer">Timer</ToggleButton>
        <ToggleButton value="lvlUp">LvlUp</ToggleButton>
      </ToggleButtonGroup>
      <MultiNodeSlider />
    </>
  );
};

export default ComponentAdding;
