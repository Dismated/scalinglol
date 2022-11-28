import { Dispatch, SetStateAction } from "react";

import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Typography,
} from "@mui/material";
import SpellCountSelector from "./SpellCountSelector";
import SpellSectionSelector from "./SpellSectionSelector";
import SpellSelector from "./SpellSelector";
import { useAppSelector } from "../hooks/preTypedHooks";

interface SpellPopUpProps {
  setSlotPressed: Dispatch<SetStateAction<boolean>>;
  id: number;
}

const buttonStyles = {
  display: "inline-block",
  float: "right",
  my: "10px",
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "5px",
  color: "background.default",
};

const SpellPopUp = ({ setSlotPressed, id }: SpellPopUpProps) => {
  const spells = useAppSelector((state) => state.spells);
  const champStats = useAppSelector((state) => state.champStats);

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
          minHeight: "270px",
          py: "10px",
          pr: "15px",
          minWidth: "360px",
          "z-index": 10,
        }}
      >
        <Typography variant="h4">Spells</Typography>
        <Box sx={{ pt: "5px" }}>
          {champStats.spells.map((spell, index) => (
            <SpellSelector key={spell.name} id={id} spellIndex={index} />
          ))}
        </Box>
        <Box sx={{ pt: "5px" }}>
          {champStats.spells[spells[id].name].variant.map(
            (spellPart, index) => (
              <SpellSectionSelector
                key={spellPart.name}
                sectionName={spellPart.name}
                sectionIndex={index}
                id={id}
              />
            )
          )}
        </Box>
        <Box sx={{ pt: "5px" }}>
          <SpellCountSelector id={id} />
          <Button onClick={handleClick} variant="contained" sx={buttonStyles}>
            Save
          </Button>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};

export default SpellPopUp;
