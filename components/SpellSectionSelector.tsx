import { Button, ClickAwayListener } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

const spellPartStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  position: "relative",
  bottom: "36px",
  display: "inline-block",
};

interface SpellSectionSelectorProps {
  spellPart: string;
  setSpellPartPressed: Dispatch<SetStateAction<boolean>>;
  id: number;
  setSpellPressed: Dispatch<SetStateAction<boolean>>;
}

const SpellSectionSelector = ({
  spellPart,
  setSpellPartPressed,
  id,
  setSpellPressed,
}: SpellSectionSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleSpellPartClick = (spellPartName: string) => {
    setSpellPartPressed(true);
    newSpells[id].section = spellPartName;
    dispatch(setSpells(newSpells));
  };

  const handleSpellPartClickAway = () => {
    setSpellPressed(false);
  };

  return (
    <ClickAwayListener key={spellPart} onClickAway={handleSpellPartClickAway}>
      <Button
        onClick={() => handleSpellPartClick(spellPart)}
        sx={spellPartStyles}
      >
        {spellPart}
      </Button>
    </ClickAwayListener>
  );
};

export default SpellSectionSelector;
