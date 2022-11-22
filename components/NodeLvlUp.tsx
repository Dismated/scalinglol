import { Box, Button, ClickAwayListener } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { setLvlUp } from "../reducers/lvlUpReducer";

const buttonStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  padding: 0,
  minWidth: "25px",
};

interface NodeLvlUpProps {
  setNodeSettingsAreOpen: Dispatch<SetStateAction<boolean>>;
  lvlUped: string;
  setLvlUped: Dispatch<SetStateAction<string>>;
  id: number;
}

const NodeLvlUp = ({
  setNodeSettingsAreOpen,
  lvlUped,
  setLvlUped,
  id,
}: NodeLvlUpProps) => {
  const spellNames = ["Q", "W", "E", "R"];
  const dispatch = useAppDispatch();
  const obj = useAppSelector((state) => state.lvlUp);
  const spellLvlUps = obj.map((e) => {
    const newE = { ...e };
    return newE;
  });

  const changeSpellLvlUp = (newSpell: string, previousSpell = "") =>
    spellLvlUps.map((spellLvlUp, i) => {
      if (i >= id) {
        const newObj = { ...spellLvlUp };
        if (previousSpell) newObj[previousSpell] -= 1;

        newObj[newSpell] += 1;

        return newObj;
      }
      return spellLvlUp;
    });

  const bottomOffset = "28px";

  const boxStyles = {
    position: "absolute",
    width: "100px",
    bottom: `${bottomOffset}`,
    left: "-46px",
  };

  const handleClickAway = () => {
    setNodeSettingsAreOpen(false);
  };

  const handleClick = (e: string) => {
    if (lvlUped) {
      dispatch(setLvlUp(changeSpellLvlUp(e, lvlUped)));
    } else {
      dispatch(setLvlUp(changeSpellLvlUp(e)));
    }
    setLvlUped(e);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box sx={boxStyles}>
          {spellNames.map((e) => (
            <Button key={e} sx={buttonStyles} onClick={() => handleClick(e)}>
              {e}
            </Button>
          ))}
        </Box>
      </Box>
    </ClickAwayListener>
  );
};

export default NodeLvlUp;
