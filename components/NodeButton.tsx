import { Button } from "@mui/material";
import React from "react";
import { SpellName } from "../types/types";

import { useAppSelector } from "../hooks/preTypedHooks";

const NodeButton = ({
  lvlUped,
  id,
}: {
  lvlUped: SpellName | undefined;
  id: number;
}) => {
  const nodeSide = useAppSelector((state) => state.nodeSide);
  const nodeSidePx = `${nodeSide}px`;

  const borderStyle = lvlUped ? "solid" : "dashed";
  const backgroundColor = lvlUped ? "primary.main" : "#1e1e1e";
  const color = lvlUped ? "black" : "primary.main";

  const ButtonStyles = {
    minHeight: nodeSidePx,
    minWidth: nodeSidePx,
    padding: 0,
    borderStyle: `${borderStyle}`,
    borderWidth: "1px",
    borderColor: "primary.main",
    position: "relative",
    left: "-5px",
    backgroundColor,
    color,
  };

  return (
    <Button variant="contained" sx={ButtonStyles}>
      {lvlUped || id + 1}
    </Button>
  );
};

export default NodeButton;
