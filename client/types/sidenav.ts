export type SidenavContextProps = {
  toggleSidenav: () => void;
  changePageId: (el: string) => void;
  sidenav: boolean;
  pageId: string;
};
