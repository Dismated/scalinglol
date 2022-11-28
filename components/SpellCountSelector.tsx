import { Box, InputBase } from "@mui/material";
import { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

const SpellCountSelector = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleCountChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    newSpells[id].count = Number(event.target.value);
    dispatch(setSpells(newSpells));
  };

  return (
    <Box
      sx={{
        display: "inline-block",
      }}
    >
      <InputBase
        onChange={handleCountChange}
        placeholder="count"
        sx={{
          "z-index": 10,
          borderRadius: "5px",
          backgroundColor: "primary.main",
          width: "60px",
          color: "background.default",
          fontSize: 16,
          p: "2px",
          mx: "5px",
          my: "10px",
        }}
        inputProps={{
          style: {
            textAlign: "center",
            width: "100%",
          },
        }}
      />
    </Box>
  );
};

export default SpellCountSelector;
