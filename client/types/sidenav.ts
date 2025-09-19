export type SidenavProps = 0 | 1;

export type SidenavContextProps = {
  toggleSidenav: () => void;
  sidenav: SidenavProps;
};