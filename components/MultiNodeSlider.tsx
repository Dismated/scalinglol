import { Box, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, useState } from "react";
import Line from "./Line";
import LineWidthPercentageProvider from "../contexts/LineWidthPercentageContext";
import MatchLengthProvider from "../contexts/MatchLengthContext";
import Node from "./Node";

const inputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
};

const MultiNodeSlider = () => {
  const [matchLength, setMatchLength] = useState("30:00");

  const itemNodes = Array.from(Array(6).keys());
  const lvlNodes = Array.from(Array(18).keys());

  const generateNodes = (arr: number[], orientation: "up" | "down") =>
    arr.map((e) => (
      <Node key={e} orientation={orientation} id={e} nodeNum={arr.length} />
    ));

  const handleMatchLengthChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMatchLength(event.target.value);
  };

  return (
    <LineWidthPercentageProvider>
      <MatchLengthProvider value={matchLength}>
        <Box sx={{ m: "10px" }}>
          {generateNodes(itemNodes, "up")}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Line />
            <FormControl>
              <InputBase
                value={matchLength}
                onChange={(event) => handleMatchLengthChange(event)}
                sx={inputBaseStyles}
                inputProps={{
                  style: {
                    textAlign: "center",
                    width: "100%",
                  },
                }}
              />
            </FormControl>
          </Box>
          {generateNodes(lvlNodes, "down")}
        </Box>
      </MatchLengthProvider>
    </LineWidthPercentageProvider>
  );
};

export default MultiNodeSlider;
