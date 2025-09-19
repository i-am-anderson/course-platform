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

  const isMobile = width <= 425;
  const isTablet = width > 425 && width <= 768;
  const isDesktop = width > 768;

  return { isMobile, isTablet, isDesktop };
};

export default useDevice