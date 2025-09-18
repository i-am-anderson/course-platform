import { NavLink } from "react-router-dom";
import ToggleTheme from "../ToggleTheme";

const Header = () => {
  return (
    <header>
      <ToggleTheme />
      <nav className="header box bg-3">
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
