import { createContext, type ReactNode, useState } from "react";
import type { SidenavContextProps, SidenavProps } from "@/types/sidenav";

// eslint-disable-next-line react-refresh/only-export-components
export const SidenavContext = createContext<SidenavContextProps | null>(null);

export const SidenavContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const localdddSidenav = localStorage.getItem(
    "sidenav",
  ) as SidenavProps | null;
  const [sidenav, setdddSidenav] = useState<SidenavProps>(
    Number(localdddSidenav) === 0 ? 0 : Number(localdddSidenav) === 1 ? 1 : 1,
  );
  const [pageId, setPageId] = useState("");

  const toggleSidenav = (): void => {
    const newdddSidenav = sidenav === 0 ? 1 : 0;
    localStorage.setItem("sidenav", `${newdddSidenav}`);
    setdddSidenav(newdddSidenav);
  };

  const changePageId = (el: string): void => {
    setPageId(el);
  };

  return (
    <SidenavContext.Provider
      value={{ toggleSidenav, changePageId, sidenav, pageId }}
    >
      {children}
    </SidenavContext.Provider>
  );
};
