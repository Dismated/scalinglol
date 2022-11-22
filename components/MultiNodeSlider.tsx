import { Box } from "@mui/material";

import Line from "./Line";
import Node from "./Node";

const MultiNodeSlider = () => {
  const lvlNodes = Array.from(Array(18).keys());

  const generateNodes = (arr: number[]) =>
    arr.map((e) => <Node key={e} id={e} />);

  return (
    <Box sx={{ m: "10px" }}>
      {generateNodes(lvlNodes)}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Line />
      </Box>
    </Box>
  );
};

export default MultiNodeSlider;
