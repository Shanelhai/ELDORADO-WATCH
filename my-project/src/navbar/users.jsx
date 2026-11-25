import React from "react";
import { NavLink } from "react-router-dom";

const User = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? "navitem-link active" : "navitem-link";

  return (
    <>
      <li>
        <NavLink to="/" end className={getLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={getLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/watch" className={getLinkClass}>
          Watch
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={getLinkClass}>
          Contact
        </NavLink>
      </li>
    </>
  );
};

export default User;