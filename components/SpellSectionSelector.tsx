import { Button } from "@mui/material";

import { setSpells } from "../reducers/spellsReducer";
import { useAppDispatch, useAppSelector } from "@hooks/preTypedHooks";

interface SpellSectionSelectorProps {
  sectionName: string;
  id: number;
  sectionIndex: number;
}

const SpellSectionSelector = ({
  sectionName,
  sectionIndex,
  id,
}: SpellSectionSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleSpellPartClick = () => {
    newSpells[id].section = sectionIndex;
    dispatch(setSpells(newSpells));
  };

  const spellPartStyles = {
    display: "inline-block",
    my: "10px",
    mr: "10px",
    color: "background.default",
  };

  return (
    <Button
      onClick={() => handleSpellPartClick()}
      sx={spellPartStyles}
      variant="contained"
    >
      {sectionName}
    </Button>
  );
};

export default SpellSectionSelector;
