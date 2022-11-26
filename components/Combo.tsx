import { Box, InputBase, Paper, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { ChampNameType } from "../types/types";
import CurvedCorner from "./CurvedCorner";
import Slot from "./Slot";
import debounce from "../helpers/debounce";
import { setPrimaryColor } from "../reducers/primaryColorReducer";
import { setSpells } from "../reducers/spellsReducer";
import stats from "../champStats/champStats.json";

const champStats: ChampNameType = { ...stats };

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "#121212",
  width: "40px",
  height: "40px",
  fontSize: 30,
  margin: 0,
};
const boxStyles = {
  backgroundColor: "primary.main",
  borderTopRightRadius: "5px",
  borderBottomLeftRadius: "23px",
  borderBottomRightRadius: "5px",
  display: "inline-block",
  pl: "20px",
};

const Combo = ({ champion }: { champion: string }) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);
  const theme = useTheme();

  useEffect(() => {
    dispatch(setPrimaryColor(champStats[champion].color));
  }, [dispatch, champion]);

  const handleSlotsChange = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = Number(event.target.value);

      if (inputValue >= 0 && inputValue < 100) {
        if (spells.length < inputValue) {
          const spellArr = [...spells];
          const fillArr = new Array(inputValue - spells.length);
          fillArr.fill({ name: "", section: "", count: 1 });
          dispatch(setSpells(spellArr.concat(fillArr)));
        } else {
          dispatch(setSpells(spells.slice(0, inputValue)));
        }
      }
    },
    1000
  );

  const generateSlots = (num: number) => {
    const arr = Array.from(Array(num).keys());

    if (spells.length > 0)
      return arr.map((e) => <Slot champion={champion} id={e} key={e} />);
    return null;
  };

  return (
    <Paper sx={{ mt: "10px", pl: "10px" }}>
      <Typography variant="h3" sx={{ display: "inline-block" }}>
        Combo
      </Typography>
      <Box sx={{ display: "inline-block", float: "right" }}>
        <Box
          sx={{ display: "inline-block", bottom: "12px", position: "relative" }}
        >
          <CurvedCorner
            corner="topRight"
            size={20}
            frontColor={theme.palette.primary.main}
            backColor="#1e1e1e"
          />
        </Box>
        <Box sx={boxStyles}>
          <Typography
            variant="h4"
            sx={{
              display: "inline-block",
              color: "#121212",
            }}
          >
            Slots:
          </Typography>
          <InputBase
            onChange={(event) => handleSlotsChange(event)}
            placeholder="1"
            sx={inputBaseStyles}
            inputProps={{
              style: {
                textAlign: "center",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ py: "10px" }}>{generateSlots(spells.length)}</Box>
    </Paper>
  );
};

export default Combo;
