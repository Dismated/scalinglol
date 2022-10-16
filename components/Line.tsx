import { Dispatch, SetStateAction, useCallback } from "react";
import { Box } from "@mui/material";

function Line(setLineWidth: Dispatch<SetStateAction<number>>) {
  const measuredRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node !== null) {
        setLineWidth(node.getBoundingClientRect().width);
      }
    },
    [setLineWidth]
  );

  return (
    <Box
      ref={measuredRef}
      sx={{
        height: "5px",
        minWidth: "90%",
        backgroundColor: "primary.main",
        display: "inline-block",
      }}
    />
  );
}

export default Line;
