import { Box, Button, ClickAwayListener } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { LvlsType, SpellName } from "../types/types";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setLvlUp } from "../reducers/lvlUpReducer";

const buttonStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  padding: 0,
  minWidth: "25px",
  backgroundColor: "#1e1e1e",
};

interface NodeLvlUpProps {
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
  lvlUped: SpellName | undefined;
  setLvlUped: Dispatch<SetStateAction<SpellName | undefined>>;
  id: number;
}

const NodeLvlUp = ({
  setNodeSettingsAreOpen,
  lvlUped,
  setLvlUped,
  id,
}: NodeLvlUpProps) => {
  const spellNames: SpellName[] = ["Q", "W", "E", "R"];
  const dispatch = useAppDispatch();
  const lvlUps = useAppSelector((state) => state.lvlUp);

  const changeSpellLvlUp = (
    newSpell: SpellName,
    previousSpell: SpellName | undefined = undefined
  ) =>
    lvlUps.map((lvlUp, i) => {
      if (i >= id) {
        const newObj: LvlsType = { ...lvlUp };
        if (previousSpell) newObj[previousSpell] -= 1;

        newObj[newSpell] += 1;

        return newObj;
      }
      return lvlUp;
    });

  const boxStyles = {
    position: "absolute",
    width: "100px",
    bottom: 0,
    left: "-46px",
  };

  const handleClick = (spellName: SpellName) => {
    if (lvlUped) {
      dispatch(setLvlUp(changeSpellLvlUp(spellName, lvlUped)));
    } else {
      dispatch(setLvlUp(changeSpellLvlUp(spellName)));
    }
    setLvlUped(spellName);
  };

  return (
    <ClickAwayListener onClickAway={() => setNodeSettingsAreOpen(false)}>
      <Box>
        <Box sx={boxStyles}>
          {spellNames.map((spellName) => (
            <Button
              key={spellName}
              sx={buttonStyles}
              onClick={() => handleClick(spellName)}
            >
              {spellName}
            </Button>
          ))}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default NodeLvlUp;
