import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Arrow = ({ orientation }: { orientation: "up" | "down" }) => {
  const theme = useTheme();

  const borderX = "5px solid transparent";
  const borderY = `5px solid ${theme.palette.primary.main}`;

  return (
    <Box
      sx={{
        width: 0,
        height: 0,
        borderLeft: borderX,
        borderRight: borderX,
        ...(orientation === "up"
          ? {
              borderTop: borderY,
            }
          : {
              borderBottom: borderY,
            }),
      }}
    />
  );
};

export default Arrow;
