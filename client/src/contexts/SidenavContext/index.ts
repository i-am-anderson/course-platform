import { useContext } from "react";
import { SidenavContext } from "./SidenavContext";

const useSidenavContext = () => {
  const context = useContext(SidenavContext);
  if (!context) {
    throw new Error(
      "useSidenavContext must be used within a SidenavContextProvider",
    );
  }

  return context;
};

export default useSidenavContext;
