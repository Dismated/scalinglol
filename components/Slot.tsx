import { Box, Button, ClickAwayListener, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import champStats from "../champStats/champStats.json";

const stats: {
  [key: string]: any;
} = champStats;

const slotButtonStyles = {
  width: "50px",
  height: "50px",
  padding: 0,
  borderStyle: "dashed",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  display: "inline-block",
};

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

const spellPartStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  position: "relative",
  bottom: "36px",
  display: "inline-block",
};

const Slot = ({ champion }: { champion: string }) => {
  const [slotPressed, setSlotPressed] = useState(false);
  const [slotIcon, setSlotIcon] = useState("");
  const [pickedSpellPart, setPickedSpellPart] = useState("");
  const [spellPressed, setSpellPressed] = useState(false);

  const handleSlotClick = () => {
    setSlotPressed(true);
  };

  const handleSpellClick = (spellName: string) => {
    setSlotPressed(false);
    setSpellPressed(true);
    setSlotIcon(spellName);
  };
  const handleSpellClickAway = () => {
    setSlotPressed(false);
  };

  const handleSpellPartClick = (spellPartName: string) => {
    setPickedSpellPart(spellPartName);
  };

  const handleSpellPartClickAway = () => {
    setSpellPressed(false);
  };

  return (
    <>
      <Box sx={{ display: "inline-block", position: "absolute" }}>
        {slotPressed
          ? Object.keys(stats[champion].spells).map((spell: any) => (
              <ClickAwayListener key={spell} onClickAway={handleSpellClickAway}>
                <Box sx={spellStyles}>
                  <Typography
                    sx={{
                      "z-index": 10,
                      position: "absolute",
                    }}
                  >
                    {spell[spell.length - 1]}
                  </Typography>
                  <Button
                    sx={spellsButtonStyles}
                    onClick={() => handleSpellClick(spell)}
                  >
                    <Image
                      src={`/../public/spellIcons/${spell}.png`}
                      alt={spell}
                      width="50"
                      height="50"
                    />
                  </Button>
                </Box>
              </ClickAwayListener>
            ))
          : null}
        {spellPressed
          ? stats[champion].spells[slotIcon].map((spellPart: any) => (
              <ClickAwayListener
                key={spellPart}
                onClickAway={handleSpellPartClickAway}
              >
                <Button
                  onClick={() => handleSpellPartClick(spellPart.part)}
                  sx={spellPartStyles}
                >
                  {spellPart.part}
                </Button>
              </ClickAwayListener>
            ))
          : null}
      </Box>
      <Button sx={slotButtonStyles} onClick={handleSlotClick}>
        {slotIcon === "" ? (
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
              {slotIcon[slotIcon.length - 1]}
            </Typography>
            <Image
              src={`/../public/spellIcons/${slotIcon}.png`}
              alt={slotIcon}
              width="50"
              height="50"
            />
            <Typography>{pickedSpellPart}</Typography>
          </>
        )}
      </Button>
    </>
  );
};

export default Slot;
