export type SidenavProps = 0 | 1;

export type SidenavContextProps = {
  toggleSidenav: () => void;
  changePageId: (el: string) => void;
  sidenav: SidenavProps;
  pageId: string;
};
