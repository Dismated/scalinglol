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
  pr: "20px",
  "&:last-child": {
    pr: 0,
  },
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
    borderRadius: "5px",
    backgroundColor: "primary.main",
    overflow: "hidden",
    p: 0,
    "&:hover": { backgroundColor: "primary.main" },
  };

  const handleSpellClick = () => {
    newSpells[id].name = spellIndex;
    newSpells[id].section = 0;
    newSpells[id].count = 1;

    dispatch(setSpells(newSpells));
  };

  return (
    <Box sx={SpellStyles}>
      <Badge
        badgeContent={champStats.spells[spellIndex].name}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={BadgeStyles}
      >
        <Button sx={SpellsButtonStyles} onClick={() => handleSpellClick()}>
          <Image
            src={`/icons/spells/${linkName}${champStats.spells[spellIndex].name}.png`}
            alt={champStats.spells[spellIndex].name}
            width="64"
            height="64"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Button>
      </Badge>
    </Box>
  );
};

export default SpellSelector;
