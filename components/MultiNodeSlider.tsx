import { Box, FormControl, InputBase } from "@mui/material";
import { ChangeEvent, useState } from "react";

import Line from "./Line";
import LineWidthPercentageProvider from "../context/LineWidthPercentageContext";
import Node from "./Node";

const InputBaseStyles = {
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: "primary.main",
  borderRadius: "4px",
  color: "primary.main",
};

const timerToSeconds = (timer: string) => {
  const [minutes, seconds] = timer.split(":");
  const time = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  return time;
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
      <Box sx={{ m: "10px" }}>
        {generateNodes(itemNodes, "up")}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Line />
          <FormControl>
            <InputBase
              value={matchLength}
              onChange={(event) => handleMatchLengthChange(event)}
              sx={InputBaseStyles}
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
    </LineWidthPercentageProvider>
  );
};

export default MultiNodeSlider;
