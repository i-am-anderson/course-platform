import { NavLink } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";
import styles from "./styles.module.scss"

const Header = () => {
  return (
    <header className={`${styles.header} bg-3`}>
      <ToggleTheme />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
