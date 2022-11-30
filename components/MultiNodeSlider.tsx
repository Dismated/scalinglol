import { Box } from "@mui/material";

import Line from "./Line";
import Node from "./Node";

const MultiNodeSlider = () => {
  const lvlNodes = Array.from(Array(18).keys());

  const generateNodes = (arr: number[]) =>
    arr.map((e) => <Node key={e} id={e} />);

  return (
    <Box
      sx={{
        py: "20px",
        pr: [0, "15px"],
        pl: [0, 0],
      }}
    >
      {generateNodes(lvlNodes)}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Line />
      </Box>
    </Box>
  );
};

export default MultiNodeSlider;
