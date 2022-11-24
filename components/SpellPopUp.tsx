import { Dispatch, SetStateAction } from "react";

import {
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { ChampNameType } from "../types/types";
import SpellCountSelector from "./SpellCountSelector";
import SpellSectionSelector from "./SpellSectionSelector";
import SpellSelector from "./SpellSelector";
import stats from "../champStats/champStats.json";
import { useAppSelector } from "../hooks/preTypedHooks";

const champStats: ChampNameType = { ...stats };

interface SpellPopUpProps {
  champion: string;
  setSlotPressed: Dispatch<SetStateAction<boolean>>;
  id: number;
}

const SpellPopUp = ({ champion, setSlotPressed, id }: SpellPopUpProps) => {
  const spells = useAppSelector((state) => state.spells);

  const handleClick = () => {
    setSlotPressed(false);
  };

  const handleClickAway = () => {
    setSlotPressed(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper
        elevation={6}
        sx={{
          position: "absolute",
          top: "150px",
          left: "50%",
          transform: "translate(-50%, 0)",
          height: "250px",
          py: "5px",
          px: "10px",
          "z-index": 10,
        }}
      >
        <Typography variant="h4">Spells</Typography>
        <Divider />
        {Object.keys(champStats[champion].spells).map((spell) => (
          <SpellSelector key={spell} id={id} spell={spell} />
        ))}
        <Divider />
        {Object.keys(champStats[champion].spells[spells[id].name]).map(
          (spellPart) => (
            <SpellSectionSelector
              key={spellPart}
              spellPart={spellPart}
              id={id}
            />
          )
        )}

        <Divider />
        <SpellCountSelector id={id} />
        <Button
          onClick={handleClick}
          sx={{
            display: "inline-block",
            float: "right",
            my: "10px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "primary.main",
            borderRadius: "5px",
          }}
        >
          Save
        </Button>
      </Paper>
    </ClickAwayListener>
  );
};

export default SpellPopUp;
