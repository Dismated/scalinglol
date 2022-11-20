import { Box, InputBase, Typography } from "@mui/material";
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
  width: "40px",
  ml: "10px",
};

const Combo = ({ champion }: { champion: string }) => {
  const [slots, setSlots] = useState(1);
  const dispatch = useAppDispatch();

  const handleSlotsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSlots(Number(event.target.value));
    const spellArr = new Array(Number(event.target.value));
    spellArr.fill({ name: "", section: "", count: 1 });
    dispatch(setSpells(spellArr));
  };

  const generateSlots = (num: number) => {
    const arr = Array.from(Array(num).keys());
    return arr.map((e) => <Slot champion={champion} id={e} key={e} />);
  };

  return (
    <>
      <Typography variant="h4">Combo</Typography>
      <Typography variant="h5" sx={{ display: "inline-block" }}>
        Slots:
      </Typography>
      <InputBase
        value={slots}
        onChange={(event) => handleSlotsChange(event)}
        sx={inputBaseStyles}
        inputProps={{
          style: {
            textAlign: "center",
            width: "100%",
            padding: 0,
          },
        }}
      />
      <Box>{generateSlots(slots)}</Box>
    </>
  );
};

export default Combo;
