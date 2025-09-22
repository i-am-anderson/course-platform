import { createContext, type ReactNode, useState } from "react";
import type { SidenavContextProps } from "@/types/sidenav";

// eslint-disable-next-line react-refresh/only-export-components
export const SidenavContext = createContext<SidenavContextProps | null>(null);

export const SidenavContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const localSidenav = localStorage.getItem("sidenav");
  const isFalse = localSidenav === "false";

  const [sidenav, setSidenav] = useState<boolean>(!isFalse);
  const [pageId, setPageId] = useState("");

  const toggleSidenav = (): void => {
    const newSidenav = !sidenav;
    localStorage.setItem("sidenav", `${newSidenav}`);
    setSidenav(newSidenav);
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
