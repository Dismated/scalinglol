import { Button } from "@mui/material";
import React from "react";

const NodeButton = ({ nodeSide }: { nodeSide: number }) => {
  const nodeSidePx = `${nodeSide}px`;

  const ButtonStyles = {
    minHeight: nodeSidePx,
    minWidth: nodeSidePx,
    padding: 0,
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "inherit",
    position: "relative",
    left: "-5px",
  };

  return <Button sx={ButtonStyles}>+</Button>;
};

export default NodeButton;
