import {
  Box,
  Button,
  ClickAwayListener,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import champStats from "../champStats/champStats.json";
import { setSpells } from "../reducers/spellsReducer";

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

const Slot = ({ champion, id }: { champion: string; id: number }) => {
  const dispatch = useAppDispatch();
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

  const handleSpellClick = (spellName: string) => {
    setSlotPressed(false);
    setSpellPressed(true);
    newSpells[id].name = spellName;
    dispatch(setSpells(newSpells));
  };
  const handleSpellClickAway = () => {
    setSlotPressed(false);
  };

  const handleSpellPartClick = (spellPartName: string) => {
    setSpellPartPressed(true);
    newSpells[id].section = spellPartName;
    dispatch(setSpells(newSpells));
  };

  const handleSpellPartClickAway = () => {
    setSpellPressed(false);
  };

  const handleCountClickAway = () => {
    setSpellPartPressed(false);
  };

  const handleCountChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    newSpells[id].count = Number(event.target.value);
    dispatch(setSpells(newSpells));
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
          ? Object.keys(stats[champion].spells[spells[id].name]).map(
              (spellPart: any) => (
                <ClickAwayListener
                  key={spellPart}
                  onClickAway={handleSpellPartClickAway}
                >
                  <Button
                    onClick={() => handleSpellPartClick(spellPart)}
                    sx={spellPartStyles}
                  >
                    {spellPart}
                  </Button>
                </ClickAwayListener>
              )
            )
          : null}
        {spellPartPressed ? (
          <ClickAwayListener onClickAway={handleCountClickAway}>
            <Box>
              <InputBase
                onChange={handleCountChange}
                placeholder="count"
                sx={{
                  "z-index": 10,
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "primary.main",
                  borderRadius: "5px",
                  position: "relative",
                  bottom: "32px",
                  width: "40px",
                  left: "12px",
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                    width: "100%",
                  },
                }}
              />
            </Box>
          </ClickAwayListener>
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
