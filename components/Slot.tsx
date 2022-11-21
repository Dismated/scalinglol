import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import { ChampNameType } from "../types/types";
import SpellCountSelector from "./SpellCountSelector";
import SpellSectionSelector from "./SpellSectionSelector";
import SpellSelector from "./SpellSelector";
import stats from "../champStats/champStats.json";
import { useAppSelector } from "../hooks/preTypedHooks";

const champStats: ChampNameType = { ...stats };

const Slot = ({ champion, id }: { champion: string; id: number }) => {
  const [slotPressed, setSlotPressed] = useState(false);
  const [spellPressed, setSpellPressed] = useState(false);
  const [spellPartPressed, setSpellPartPressed] = useState(false);
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const handleSlotClick = () => {
    setSlotPressed(true);
  };

  const borderStyle = newSpells[id].name ? "solid" : "dashed";

  const slotButtonStyles = {
    width: "50px",
    height: "50px",
    padding: 0,
    borderStyle,
    borderWidth: "1px",
    borderColor: "primary.main",
    borderRadius: "4px",
    display: "inline-block",
  };

  return (
    <>
      <Box sx={{ display: "inline-block", position: "absolute" }}>
        {slotPressed
          ? Object.keys(champStats[champion].spells).map((spell) => (
              <SpellSelector
                key={spell}
                setSlotPressed={setSlotPressed}
                setSpellPressed={setSpellPressed}
                id={id}
                spell={spell}
              />
            ))
          : null}
        {spellPressed
          ? Object.keys(champStats[champion].spells[spells[id].name]).map(
              (spellPart) => (
                <SpellSectionSelector
                  key={spellPart}
                  spellPart={spellPart}
                  setSpellPartPressed={setSpellPartPressed}
                  id={id}
                  setSpellPressed={setSpellPressed}
                />
              )
            )
          : null}
        {spellPartPressed ? (
          <SpellCountSelector
            id={id}
            setSpellPartPressed={setSpellPartPressed}
          />
        ) : null}
      </Box>
      <Button sx={slotButtonStyles} onClick={handleSlotClick}>
        {spells[id].name === "" ? (
          "+"
        ) : (
          <>
            <Typography
              sx={{
                "z-index": 10,
                position: "absolute",
                color: "white",
              }}
            >
              {spells[id].name[spells[id].name.length - 1]}
            </Typography>
            <Image
              src={`/../public/spellIcons/${spells[id]?.name}.png`}
              alt={spells[id].name}
              width="50"
              height="50"
            />
            <Typography>{spells[id].section}</Typography>
          </>
        )}
      </Button>
    </>
  );
};

export default Slot;
