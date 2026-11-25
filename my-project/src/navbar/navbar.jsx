import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import User from "./users";
import Admin from "./admin";
import account from "../allcomponent/assets/about/account.jpg";
import "./navbar.css";

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateUser = () => {
      setRole(localStorage.getItem("role"));
      setId(localStorage.getItem("userId"));
    };

    window.addEventListener("storageChange", updateUser);
    updateUser();

    return () => {
      window.removeEventListener("storageChange", updateUser);
    };
  }, [location]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setId(null);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <div className="logo">
          <NavLink to="/" className="nav-logo">
            ELDORADO <span>WATCH</span>
          </NavLink>
        </div>

        <div className="nav-right">
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {role === "admin" ? <Admin handleLogout={handleLogout} /> : <User />}
          </ul>

          <NavLink
            to="/dashboard"
            className="profile-link"
            aria-label="Account dashboard"
            data-user-id={id || ""}
          >
            <img src={account} alt="Account" className="profile-img" />
          </NavLink>

          <button
            type="button"
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;