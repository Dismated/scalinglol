import { Box, Typography } from "@mui/material";
import Image from "next/image";

import MatchLengthTimer from "./MatchLengthTimer";
import { useAppSelector } from "../hooks/preTypedHooks";

const TopRow = () => {
  const champStats = useAppSelector((state) => state.champStats);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: ["center", "space-between"],
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: ["100px", "130px"],
            height: ["100px", "130px"],
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/icons/champions/${champStats.name}.png`}
            alt={champStats.name}
            layout="fill"
            priority
          />
        </Box>
        <Box sx={{ pl: "10px" }}>
          <Box>
            <Typography variant="h3" sx={{ display: "inline" }}>
              {champStats.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ display: "inline" }}>
              {champStats.title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: ["none", "inline-block"],
          float: "right",
          width: "200px",
          alignSelf: "center",
        }}
      >
        <MatchLengthTimer />
      </Box>
    </Box>
  );
};

export default TopRow;
