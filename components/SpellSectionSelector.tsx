import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

interface SpellSectionSelectorProps {
  spellPart: string;
  id: number;
}

const SpellSectionSelector = ({ spellPart, id }: SpellSectionSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleSpellPartClick = (spellPartName: string) => {
    newSpells[id].section = spellPartName;
    console.log(newSpells);

    dispatch(setSpells(newSpells));
  };

  const borderWidth = spellPart === newSpells[id].section ? "1px" : 0;

  const spellPartStyles = {
    borderStyle: "solid",
    borderWidth,
    borderColor: "primary.main",
    display: "inline-block",
    my: "10px",
    mx: "5px",
  };

  return (
    <Button
      onClick={() => handleSpellPartClick(spellPart)}
      sx={spellPartStyles}
    >
      {spellPart}
    </Button>
  );
};

export default SpellSectionSelector;
