import { Box } from "@mui/material";

import Arrow from "./Arrow";
import NodeButton from "./NodeButton";

function Node({
  up,
  key,
  id,
  lineWidth,
  nodeNum,
}: {
  up: boolean;
  key: number;
  id: number;
  lineWidth: number;
  nodeNum: number;
}) {
  console.log(lineWidth);

  return (
    <Box
      sx={{
        left: `${-5 + (lineWidth / nodeNum) * id}px`,
        position: "relative",
        display: "inline-block",
      }}
      key={key}
    >
      {up ? (
        <Box
          sx={{
            bottom: "-14px",
            position: "relative",
          }}
        >
          <NodeButton />
          <Arrow top />
        </Box>
      ) : (
        <Box sx={{ top: "-11px", position: "relative" }}>
          <Arrow top={false} />
          <NodeButton />
        </Box>
      )}
    </Box>
  );
}

export default Node;
