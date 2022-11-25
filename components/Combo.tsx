import { Box, InputBase, Paper, Typography } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/preTypedHooks";
import { ChampNameType } from "../types/types";
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
  color: "primary.main",
  width: "50px",
  height: "50px",
  ml: "10px",
  fontSize: 20,
  margin: 0,
};

const Combo = ({ champion }: { champion: string }) => {
  const dispatch = useAppDispatch();
  const spells = useAppSelector((state) => state.spells);

  useEffect(() => {
    dispatch(setPrimaryColor(champStats[champion].color));
  }, [dispatch, champion]);

  const handleSlotsChange = debounce(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const parseInput = Number(event.target.value);

      if (parseInput >= 0 && parseInput < 100) {
        if (spells.length < parseInput) {
          const spellArr = [...spells];
          const fillArr = new Array(parseInput - spells.length);
          fillArr.fill({ name: "", section: "", count: 1 });
          dispatch(setSpells(spellArr.concat(fillArr)));
        } else {
          dispatch(setSpells(spells.slice(0, parseInput)));
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
    <Paper sx={{ my: "10px", px: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" sx={{ display: "inline-block" }}>
          Combo
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              display: "inline-block",
              transform: "rotate(-90deg)",
              position: "relative",
              left: "12px",
            }}
          >
            Slots
          </Typography>
          <InputBase
            onChange={(event) => handleSlotsChange(event)}
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
