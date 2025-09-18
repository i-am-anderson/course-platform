
import { NavLink } from "react-router-dom";

const Sidenav = () => {
  return (
    <nav>
      <nav className="sidenav box bg-3">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/exam">Exam</NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Sidenav;
