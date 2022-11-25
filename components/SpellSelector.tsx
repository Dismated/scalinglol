import { Badge, Box, Button } from "@mui/material";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

interface SpellSelectorProps {
  id: number;
  spell: string;
}

const spellStyles = {
  display: "inline-block",
  py: "10px",
  px: "5px",
};

const SpellSelector = ({ id, spell }: SpellSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const borderWidth = newSpells[id].name === spell ? "1px" : 0;

  const spellsButtonStyles = {
    height: "64px",
    width: "64px",
    borderWidth,
    borderStyle: "solid",
    borderColor: "primary.main",
    p: 0,
  };

  const handleSpellClick = (spellName: string) => {
    newSpells[id].name = spellName;
    newSpells[id].section = "basic";
    newSpells[id].count = 1;
    dispatch(setSpells(newSpells));
  };

  return (
    <Box sx={spellStyles}>
      <Badge badgeContent={spell[spell.length - 1]} color="primary">
        <Button sx={spellsButtonStyles} onClick={() => handleSpellClick(spell)}>
          <Image
            src={`/spellIcons/${spell}.png`}
            alt={spell}
            width="64"
            height="64"
          />
        </Button>
      </Badge>
    </Box>
  );
};

export default SpellSelector;
