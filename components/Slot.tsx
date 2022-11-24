import { Badge, Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { ChampNameType } from "../types/types";
import SpellPopUp from "./SpellPopUp";
import { setSpells } from "../reducers/spellsReducer";
import stats from "../champStats/champStats.json";

const champStats: ChampNameType = { ...stats };

const Slot = ({ champion, id }: { champion: string; id: number }) => {
  const dispatch = useAppDispatch();
  const [slotPressed, setSlotPressed] = useState(false);
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const borderStyle = newSpells[id].name ? "solid" : "dashed";
  const slotButtonStyles = {
    width: "80px",
    height: "115px",
    padding: 0,
    borderStyle,
    borderWidth: "2px",
    borderColor: "primary.main",
    borderRadius: "4px",
    display: "inline-block",
  };
  const slotBoxStyles = {
    display: "flex",
    alignContent: "space-between",
    flexWrap: "wrap",
    height: "100%",
  };
  const spellSectionBoxStyles = {
    height: "35px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleSlotClick = () => {
    setSlotPressed(true);
    // eslint-disable-next-line prefer-destructuring
    newSpells[id].name = Object.keys(champStats[champion].spells)[0];
    newSpells[id].section = "basic";
    dispatch(setSpells(newSpells));
  };

  return (
    <Box sx={{ display: "inline-block", m: "12px" }}>
      {slotPressed ? (
        <SpellPopUp
          champion={champion}
          setSlotPressed={setSlotPressed}
          id={id}
        />
      ) : null}

      <Badge
        badgeContent={newSpells[id].name[spells[id].name.length - 1]}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiBadge-badge": {
            fontFamily: "Merriweather",
          },
        }}
      >
        <Badge
          badgeContent={newSpells[id].count}
          color="primary"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Button sx={slotButtonStyles} onClick={handleSlotClick}>
            {spells[id].name === "" ? (
              "+"
            ) : (
              <Box sx={slotBoxStyles}>
                <Image
                  src={`/../public/spellIcons/${spells[id]?.name}.png`}
                  alt={spells[id].name}
                  width="80"
                  height="80"
                />
                <Box sx={spellSectionBoxStyles}>
                  <Typography>{spells[id].section}</Typography>
                </Box>
              </Box>
            )}
          </Button>
        </Badge>
      </Badge>
    </Box>
  );
};

export default Slot;
