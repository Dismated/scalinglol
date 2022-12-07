import { Button } from "@mui/material";
import React from "react";

import { NodeOptions } from "@customTypes/customTypes";
import { useAppSelector } from "@hooks/preTypedHooks";

const NodeButton = ({
  id,
  nodeOptions,
}: {
  id: number;
  nodeOptions: NodeOptions;
}) => {
  const nodeSide = useAppSelector((state) => state.nodeSide);
  const lvlUp = useAppSelector((state) => state.lvlUp);
  const nodeSidePx = `${nodeSide}px`;

  const backgroundColor = nodeOptions === "your" ? "primary.main" : "black";
  const color = nodeOptions === "your" ? "black" : "primary.main";

  const ButtonStyles = {
    minHeight: nodeSidePx,
    minWidth: nodeSidePx,
    padding: 0,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "primary.main",
    position: "relative",
    left: "-5px",
    backgroundColor,
    color,
  };

  return (
    <Button variant="contained" sx={ButtonStyles}>
      {nodeOptions === "your" ? lvlUp[id] : id + 1}
    </Button>
  );
};

export default NodeButton;
