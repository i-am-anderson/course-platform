import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

const Sidenav = () => {
  return (
    <nav className={`${styles.sidenav} bg-3`}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/exam">Exam</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
