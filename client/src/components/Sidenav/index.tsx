import React from "react";
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
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Sidenav;
