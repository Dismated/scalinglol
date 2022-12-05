import { Button } from "@mui/material";
import React from "react";

import { useAppSelector } from "../hooks/preTypedHooks";

const NodeButton = ({ id }: { id: number }) => {
  const nodeSide = useAppSelector((state) => state.nodeSide);
  const lvlUp = useAppSelector((state) => state.lvlUp);
  const nodeSidePx = `${nodeSide}px`;

  const ButtonStyles = {
    minHeight: nodeSidePx,
    minWidth: nodeSidePx,
    padding: 0,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "primary.main",
    position: "relative",
    left: "-5px",
    backgroundColor: "primary.main",
    color: "black",
  };

  return (
    <Button variant="contained" sx={ButtonStyles}>
      {lvlUp[id]}
    </Button>
  );
};

export default NodeButton;
