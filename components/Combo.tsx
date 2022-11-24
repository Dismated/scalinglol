import { Box, Divider, InputBase, Paper, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Slot from "./Slot";
import { setSpells } from "../reducers/spellsReducer";
import { useAppDispatch } from "../hooks/preTypedHooks";

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
  width: "50px",
  height: "50px",
  ml: "10px",
  fontSize: 20,
  margin: 0,
};

const Combo = ({ champion }: { champion: string }) => {
  const [slots, setSlots] = useState(1);
  const dispatch = useAppDispatch();

  const handleSlotsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const parseInput = Number(event.target.value);
    if (parseInput >= 0 && parseInput < 100) {
      setSlots(Number(event.target.value));
      const spellArr = new Array(Number(event.target.value));
      spellArr.fill({ name: "", section: "", count: 1 });
      dispatch(setSpells(spellArr));
    }
  };

  const generateSlots = (num: number) => {
    const arr = Array.from(Array(num).keys());
    return arr.map((e) => <Slot champion={champion} id={e} key={e} />);
  };

  return (
    <Paper sx={{ my: "10px", px: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" sx={{ display: "inline-block" }}>
          Combo
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              display: "inline-block",
              transform: "rotate(-90deg)",
              position: "relative",
              left: "12px",
            }}
          >
            Slots
          </Typography>
          <InputBase
            value={slots}
            onChange={(event) => handleSlotsChange(event)}
            sx={inputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
          />
        </Box>
      </Box>
      <Divider />

      <Box sx={{ py: "10px" }}>{generateSlots(slots)}</Box>
    </Paper>
  );
};

export default Combo;
