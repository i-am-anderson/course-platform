
import { createContext, type ReactNode, useState } from "react";
import type { SidenavContextProps, SidenavProps } from "@/types/sidenav"

// eslint-disable-next-line react-refresh/only-export-components
export const SidenavContext = createContext<SidenavContextProps | null>(null);

export const SidenavContextProvider = ({ children }: { children: ReactNode }) => {
  const localdddSidenav = localStorage.getItem("sidenav") as SidenavProps | null;
  const [sidenav, setdddSidenav] = useState<SidenavProps>(Number(localdddSidenav) === 0 ? 0 : Number(localdddSidenav) === 1 ? 1 : 1);

  const toggleSidenav = (): void => {
    const newdddSidenav = sidenav === 0 ? 1 : 0;
    localStorage.setItem("sidenav", `${!newdddSidenav}`);
    setdddSidenav(newdddSidenav);
  };

  return (
    <SidenavContext.Provider value={{ toggleSidenav, sidenav }}>
      {children}
    </SidenavContext.Provider>
  );
};
