import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState<{
    width: number;
  }>();
  const handleResize = () => {
    setWindowWidth({
      width: window.innerWidth,
    });
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

export default useWindowSize;
