import { Badge, Box, Button, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import SpellPopUp from "./SpellPopUp";
import { useAppSelector } from "../hooks/preTypedHooks";

const SlotButtonStyles = {
  width: "80px",
  height: "115px",
  padding: 0,
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "primary.main",
  borderRadius: "4px",
  display: "inline-block",
};
const SlotBoxStyles = {
  display: "flex",
  alignContent: "space-between",
  flexWrap: "wrap",
  height: "100%",
};
const SpellSectionBoxStyles = {
  height: "35px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const BadgeStyles = {
  "& .MuiBadge-badge": {
    fontFamily: "Merriweather",
    fontSize: 16,
  },
};

interface SlotProps {
  id: number;
  setSlotPressed: Dispatch<SetStateAction<boolean>>;
  slotPressed: boolean;
}

const Slot = ({ id, setSlotPressed, slotPressed }: SlotProps) => {
  const champStats = useAppSelector((state) => state.champStats);
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((spl) => {
    const newE = { ...spl };
    return newE;
  });
  const slotSpell = champStats.spells[newSpells[id].name];
  const linkName =
    champStats.spells[newSpells[id].name].name === "A"
      ? "BasicAttack"
      : champStats.name;

  const handleSlotClick = () => {
    setSlotPressed(true);
  };

  return (
    <Box sx={{ display: "inline-block", m: "12px" }}>
      {slotPressed ? (
        <SpellPopUp setSlotPressed={setSlotPressed} id={id} />
      ) : null}

      <Badge
        badgeContent={slotSpell.name}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={BadgeStyles}
      >
        <Badge
          badgeContent={newSpells[id].count}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={BadgeStyles}
        >
          <Button sx={SlotButtonStyles} onClick={handleSlotClick}>
            <Box sx={SlotBoxStyles}>
              <Image
                src={`/icons/spells/${linkName}${slotSpell.name}.png`}
                alt={slotSpell.name}
                width="80"
                height="80"
              />
              <Box sx={SpellSectionBoxStyles}>
                <Typography>
                  {slotSpell.variant[newSpells[id].section].name}
                </Typography>
              </Box>
            </Box>
          </Button>
        </Badge>
      </Badge>
    </Box>
  );
};

export default Slot;
