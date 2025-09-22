import { createContext, type ReactNode, useState } from "react";
import type { SidenavContextProps } from "@/types/sidenav";

// eslint-disable-next-line react-refresh/only-export-components
export const SidenavContext = createContext<SidenavContextProps | null>(null);

export const SidenavContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Verifica se o valor salvo no localStorage e se é "false"
  const localSidenav = localStorage.getItem("sidenav");
  const isFalse = localSidenav === "false";

  const [sidenav, setSidenav] = useState<boolean>(!isFalse);
  const [pageId, setPageId] = useState("");

  // Função para alternar o estado do sidenav e salvar no localStorage
  const toggleSidenav = (): void => {
    const newSidenav = !sidenav;
    localStorage.setItem("sidenav", `${newSidenav}`);
    setSidenav(newSidenav);
  };

  // Função para alterar o pageId (usado para destacar qual item está ativo no Sidenav)
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
