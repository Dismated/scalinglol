import { Box } from "@mui/material";
import { useMemo } from "react";

import Line from "./Line";
import Node from "./Node";

const MultiNodeSlider = () => {
  const lvlNodes = Array.from(Array(18).keys());

  const nodes = useMemo(
    () => lvlNodes.map((node) => <Node key={node} id={node} />),
    [lvlNodes]
  );

  return (
    <Box
      sx={{
        py: "20px",
        pr: [0, "15px"],
        pl: "15px",
        minWidth: "600px",
      }}
    >
      {nodes}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Line />
      </Box>
    </Box>
  );
};

export default MultiNodeSlider;
