import { Box } from "@mui/material";
import { useContext } from "react";

import { LineWidthPercentageContext } from "../context/LineWidthPercentageContext";

const Line = () => {
  const widthPercentage = useContext(LineWidthPercentageContext);

  return (
    <Box
      sx={{
        height: "5px",
        minWidth: `${widthPercentage}%`,
        backgroundColor: "primary.main",
      }}
    />
  );
};

export default Line;
