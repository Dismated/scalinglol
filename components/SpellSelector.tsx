import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

interface SpellSelectorProps {
  setSlotPressed: Dispatch<SetStateAction<boolean>>;
  setSpellPressed: Dispatch<SetStateAction<boolean>>;
  id: number;
  spell: string;
}

const spellsButtonStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  height: "50px",
  width: "50px",
};

const spellStyles = {
  position: "relative",
  bottom: "50px",
  display: "inline-block",
  backgroundColor: "#121212",
};

const SpellSelector = ({
  setSlotPressed,
  setSpellPressed,
  id,
  spell,
}: SpellSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleSpellClick = (spellName: string) => {
    setSlotPressed(false);
    setSpellPressed(true);
    newSpells[id].name = spellName;
    dispatch(setSpells(newSpells));
  };

  const handleSpellClickAway = () => {
    setSlotPressed(false);
  };

  return (
    <ClickAwayListener onClickAway={handleSpellClickAway}>
      <Box sx={spellStyles}>
        <Typography
          sx={{
            "z-index": 10,
            position: "absolute",
          }}
        >
          {spell[spell.length - 1]}
        </Typography>
        <Button sx={spellsButtonStyles} onClick={() => handleSpellClick(spell)}>
          <Image
            src={`/../public/spellIcons/${spell}.png`}
            alt={spell}
            width="50"
            height="50"
          />
        </Button>
      </Box>
    </ClickAwayListener>
  );
};

export default SpellSelector;
