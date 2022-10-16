import { Box, InputBase } from "@mui/material";
import { ChangeEvent, useState } from "react";

import Line from "./Line";
import Node from "./Node";

function MultiNodeSlider() {
  const [lineWidth, setLineWidth] = useState(0);
  const [matchLength, setMatchLength] = useState(1800);

  const itemNodes = Array.from(Array(6).keys());
  const lvlNodes = Array.from(Array(18).keys());

  function generateNodes(arr: number[], up: boolean) {
    return arr.map((e) => (
      <Node up={up} key={e} id={e} lineWidth={lineWidth} nodeNum={arr.length} />
    ));
  }

  function handleMatchLengthChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const [minutes, seconds] = event.target.value.split(":");
    const time = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    setMatchLength(time);
  }

  return (
    <>
      {generateNodes(itemNodes, true)}
      <Box>
        <Line setLineWidth={setLineWidth} />
        <InputBase
          placeholder="30:00"
          onChange={(event) => handleMatchLengthChange(event)}
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "primary.main",
            width: "10%",
          }}
          inputProps={{ style: { textAlign: "center", width: "100%" } }}
        />
      </Box>
      {generateNodes(lvlNodes, false)}
    </>
  );
}

export default MultiNodeSlider;
