import React from "react";
import { NavLink } from "react-router-dom";

const Admin = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? "navitem-link active" : "navitem-link";

  return (
    <>
      <li>
        <NavLink to="/category" className={getLinkClass}>
          Category
        </NavLink>
      </li>
      <li>
        <NavLink to="/product" className={getLinkClass}>
          Product
        </NavLink>
      </li>
      <li>
        <NavLink to="/userdetails" className={getLinkClass}>
          User Details
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-orders" className={getLinkClass}>
          All Orders
        </NavLink>
      </li>
    </>
  );
};

export default Admin;