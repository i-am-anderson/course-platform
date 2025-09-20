import { useEffect, useState } from "react";

const useDevice = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const isMobile = width <= 468;
  const isTablet = width > 468 && width <= 991;
  const isDesktop = width > 991;

  return { isMobile, isTablet, isDesktop };
};

export default useDevice