import { Button } from "@mui/material";
import React from "react";

function NodeButton() {
  return (
    <Button
      sx={{
        minHeight: "20px",
        minWidth: "20px",
        padding: 0,
        borderStyle: "dashed",
        borderWidth: "1px",
        borderColor: "inherit",
        position: "relative",
        left: "-5px",
      }}
    >
      +
    </Button>
  );
}

export default NodeButton;
