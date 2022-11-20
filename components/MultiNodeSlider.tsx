import { Box } from "@mui/material";

import Line from "./Line";
import Node from "./Node";

const MultiNodeSlider = ({
  heading,
}: {
  heading: "Attack" | "Defence" | "Graphs";
}) => {
  const itemNodes = Array.from(Array(6).keys());
  const lvlNodes = Array.from(Array(18).keys());

  const generateNodes = (arr: number[], orientation: "up" | "down") =>
    arr.map((e) => (
      <Node orientation={orientation} key={e} id={e} heading={heading} />
    ));

  return (
    <Box sx={{ m: "10px" }}>
      {generateNodes(itemNodes, "up")}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Line />
      </Box>
      {generateNodes(lvlNodes, "down")}
    </Box>
  );
};

export default MultiNodeSlider;
