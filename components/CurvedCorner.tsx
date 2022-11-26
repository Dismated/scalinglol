import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CurvedCorner = ({
  corner,
  size,
  backColor,
  frontColor,
}: {
  corner: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
  size: number;
  backColor: string;
  frontColor: string;
}) => {
  const corners = {
    bottomRight: {
      bottom: 0,
      right: 0,
      boxShadow: `${size}px ${size}px 0 0 ${frontColor}`,
    },
    bottomLeft: {
      bottom: 0,
      left: 0,
      boxShadow: `-${size}px ${size}px 0 0 ${frontColor}`,
    },
    topRight: {
      top: 0,
      right: 0,
      boxShadow: `${size}px -${size}px 0 0 ${frontColor}`,
    },
    topLeft: {
      top: 0,
      left: 0,
      boxShadow: `-${size}px -${size}px 0 0 ${frontColor}`,
    },
  };

  const StyledCorner = styled(Box)(() => ({
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: `${backColor}`,
    overflow: "hidden",
    position: "relative",
    "&:before": [
      {
        content: "''",
        display: "block",
        width: "200%",
        height: "200%",
        position: "absolute",
        borderRadius: "50%",
      },
      { ...corners[corner] },
    ],
  }));

  return <StyledCorner />;
};

export default CurvedCorner;
