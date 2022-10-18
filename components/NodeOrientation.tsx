import { Box, FormControl, InputBase } from "@mui/material";
import Arrow from "./Arrow";
import NodeButton from "./NodeButton";

interface NodeOrientationProps {
  offsetBottom: number;
  orientation: "up" | "down";
  flexDirection: "column" | "column-reverse";
  openTimer: boolean;
  nodeSide: number;
}

const NodeOrientation = ({
  offsetBottom,
  orientation,
  flexDirection,
  openTimer,
  nodeSide,
}: NodeOrientationProps) => (
  <Box
    sx={{
      bottom: `${offsetBottom}px`,
      position: "relative",
      display: "flex",
      flexDirection: { flexDirection },
    }}
  >
    {openTimer ? (
      <FormControl>
        <InputBase />
      </FormControl>
    ) : null}
    <NodeButton nodeSide={nodeSide} />
    <Arrow orientation={orientation} />
  </Box>
);

export default NodeOrientation;
