import { useEffect, useState } from "react";

const useDevice = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // Função para atualizar a largura da janela
  const handleSize = () => {
    setWidth(window.innerWidth);
  };

  // Adiciona o event listener para redimensionamento da janela
  useEffect(() => {
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  // Define os breakpoints
  const isMobile = width <= 480;
  const isTablet = width > 480 && width <= 991;
  const isDesktop = width > 991;

  return { isMobile, isTablet, isDesktop };
};

export default useDevice