import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import CurvedCorner from "./CurvedCorner";
import Slot from "./Slot";
import { setPrimaryColor } from "../reducers/primaryColorReducer";
import { setSpells } from "../reducers/spellsReducer";

const boxStyles = {
  backgroundColor: "primary.main",
  borderTopRightRadius: "30px",
  borderBottomLeftRadius: "23px",
  display: "inline-block",
  pl: "20px",
  pr: "15px",
};

const slotButtonStyles = {
  width: "80px",
  height: "115px",
  padding: 0,
  borderStyle: "dashed",
  borderWidth: "2px",
  borderColor: "primary.main",
  borderRadius: "4px",
  display: "inline-block",
  m: "12px",
};

const Combo = () => {
  const [slotPressed, setSlotPressed] = useState(false);
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const champStats = useAppSelector((state) => state.champStats);
  const theme = useTheme();

  const newSpells = spells.map((spl) => {
    const newE = { ...spl };
    return newE;
  });

  useEffect(() => {
    dispatch(setPrimaryColor(champStats.color));
  }, [champStats.color, dispatch]);

  const handleSlotClick = () => {
    newSpells.push({ name: 0, section: 0, count: 1 });
    dispatch(setSpells(newSpells));
    setSlotPressed(true);
  };

  const generateSlots = (num: number) => {
    const arr = Array.from(Array(num).keys());

    if (spells.length > 0)
      return arr.map((e) => (
        <Slot
          id={e}
          key={e}
          setSlotPressed={setSlotPressed}
          slotPressed={slotPressed}
        />
      ));
    return null;
  };

  return (
    <Paper>
      <Typography variant="h3" sx={{ display: "inline-block" }}>
        Combo
      </Typography>
      <Box sx={{ display: "inline-block", float: "right" }}>
        <Box
          sx={{ display: "inline-block", bottom: "12px", position: "relative" }}
        >
          <CurvedCorner
            corner="topRight"
            size={20}
            frontColor={theme.palette.primary.main}
            backColor="#1e1e1e"
          />
        </Box>
        <Box sx={boxStyles}>
          <Typography
            variant="h4"
            sx={{
              display: "inline-block",
              color: "#121212",
            }}
          >
            Slots: {spells.length}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ py: "10px" }}>
        {generateSlots(spells.length)}
        <Button sx={slotButtonStyles} onClick={handleSlotClick}>
          Add Spell
        </Button>
      </Box>
    </Paper>
  );
};

export default Combo;
