import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  ClickAwayListener,
  Paper,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@hooks/preTypedHooks";
import SpellCountSelector from "./SpellCountSelector";
import SpellSectionSelector from "./SpellSectionSelector";
import SpellSelector from "./SpellSelector";

interface SpellPopUpProps {
  setSlotPressed: Dispatch<SetStateAction<number>>;
  id: number;
}

const PaperStyles = {
  position: "absolute",
  top: "150px",
  left: "50%",
  transform: "translate(-50%, 0)",
  minHeight: "270px",
  py: "10px",
  pr: "15px",
  minWidth: "360px",
  "z-index": 10,
};

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
  const { t } = useTranslation("common");

  return (
    <ClickAwayListener onClickAway={() => setSlotPressed(-1)}>
      <Paper elevation={6} sx={PaperStyles}>
        <Typography variant="h4">
          {t("champPage.popupContainer.header")}
        </Typography>
        <Box sx={{ pt: "5px" }}>
          {champStats.spells.map((spell, index) => (
            <SpellSelector key={spell.name} id={id} spellIndex={index} />
          ))}
        </Box>
        <Box
          sx={{
            pt: "5px",
          }}
        >
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
          <Button
            onClick={() => setSlotPressed(-1)}
            variant="contained"
            sx={buttonStyles}
          >
            {t("champPage.popupContainer.save")}
          </Button>
        </Box>
      </Paper>
    </ClickAwayListener>
  );
};

export default SpellPopUp;
