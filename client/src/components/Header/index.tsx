import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import useSidebarContext from "@/src/contexts/SidenavContext";
import ToggleTheme from "@/src/components/ToggleTheme";

import styles from "./styles.module.scss";

const Header = () => {
    const { toggleSidenav } = useSidebarContext();

  return (
    <header className={`${styles.header}`}>
      <div>
        <button onClick={toggleSidenav}>
          <Menu color="#000" size={36} />
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
