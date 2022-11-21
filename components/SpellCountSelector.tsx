import { Box, ClickAwayListener, InputBase } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setSpells } from "../reducers/spellsReducer";

interface SpellCountSelectorProps {
  setSpellPartPressed: Dispatch<SetStateAction<boolean>>;
  id: number;
}

const SpellCountSelector = ({
  setSpellPartPressed,
  id,
}: SpellCountSelectorProps) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const newSpells = spells.map((e) => {
    const newE = { ...e };
    return newE;
  });

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
  );
};

export default SpellCountSelector;
