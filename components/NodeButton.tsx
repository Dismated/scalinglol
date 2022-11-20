import { Button } from "@mui/material";
import React from "react";

const NodeButton = ({
  nodeSide,
  lvlUped,
  id,
}: {
  nodeSide: number;
  lvlUped: string;
  id: number;
}) => {
  const nodeSidePx = `${nodeSide}px`;

  const borderStyle = lvlUped ? "solid" : "dashed";

  const ButtonStyles = {
    minHeight: nodeSidePx,
    minWidth: nodeSidePx,
    padding: 0,
    borderStyle: `${borderStyle}`,
    borderWidth: "1px",
    borderColor: "inherit",
    position: "relative",
    left: "-5px",
  };

  return <Button sx={ButtonStyles}>{lvlUped || id + 1}</Button>;
};

export default NodeButton;
