import { Badge, Box, Button } from "@mui/material";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

interface SpellSelectorProps {
  id: number;
  spellIndex: number;
}

const SpellStyles = {
  display: "inline-block",
  py: "10px",
  px: "5px",
};

const BadgeStyles = {
  fontSize: 16,
  "& .MuiBadge-badge": {
    fontFamily: "Merriweather",
  },
};

const SpellSelector = ({ id, spellIndex }: SpellSelectorProps) => {
  const dispatch = useAppDispatch();
  const champStats = useAppSelector((state) => state.champStats);
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((spl) => {
    const newE = { ...spl };
    return newE;
  });

  const borderWidth = newSpells[id].name === spellIndex ? "3px" : 0;
  const linkName =
    champStats.spells[spellIndex].name === "A"
      ? "BasicAttack"
      : champStats.name;

  const SpellsButtonStyles = {
    height: "64px",
    width: "64px",
    borderWidth,
    borderStyle: "solid",
    borderColor: "primary.main",
    p: 0,
  };

  const handleSpellClick = () => {
    newSpells[id].name = spellIndex;
    // eslint-disable-next-line prefer-destructuring
    newSpells[id].section = 0;
    newSpells[id].count = 1;

    dispatch(setSpells(newSpells));
  };

  return (
    <Box sx={SpellStyles}>
      <Badge
        badgeContent={champStats.spells[spellIndex].name}
        color="primary"
        sx={BadgeStyles}
      >
        <Button sx={SpellsButtonStyles} onClick={() => handleSpellClick()}>
          <Image
            src={`/icons/spells/${linkName}${champStats.spells[spellIndex].name}.png`}
            alt={champStats.spells[spellIndex].name}
            width="64"
            height="64"
          />
        </Button>
      </Badge>
    </Box>
  );
};

export default SpellSelector;
