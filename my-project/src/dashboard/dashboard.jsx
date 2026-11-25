import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import api from "../API/API";
import "./dashboard.css";
import Footer from "../Allcomponent/Footer/Footer";
import URISE from "../Allcomponent/Assets/About/aura_watch.jpg";

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className="dashboard-container">
          <span className="dashboard-eyebrow">ELDORADO WATCH</span>
          <h1>Account Overview</h1>

          <div className="dashboard-boxes">
            <div className="box box-logo-box">
              <p className="welcome-text">Welcome, {user.name}</p>
              <div className="logo-placeholder">
                <img src={URISE} alt="ELDORADO WATCH Logo" />
              </div>
              <span className="member-badge">{user.role || "Member"}</span>
            </div>

            <div className="box info-box">
              <div className="details">
                <p><strong>Email</strong> <span>{user.email}</span></p>
                <p><strong>Role</strong> <span>{user.role}</span></p>
                <p><strong>Phone</strong> <span>{user.phone || "-"}</span></p>
                <p><strong>City</strong> <span>{user.city || "-"}</span></p>
                <p><strong>Address</strong> <span>{user.address || "-"}</span></p>
              </div>
              <button type="button" onClick={handleLogout} className="btn-dark logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="auth-page-wrapper">
        <div className="main-container">
          <span className="auth-eyebrow">ELDORADO WATCH</span>
          <div className="header-buttons">
            <button
              type="button"
              className={activeForm === "login" ? "active" : ""}
              onClick={() => setActiveForm("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={activeForm === "register" ? "active" : ""}
              onClick={() => setActiveForm("register")}
            >
              Register
            </button>
          </div>

          <div className="form-container">
            {activeForm === "login" && (
              <Login formKey={activeForm} onLogin={setUser} />
            )}
            {activeForm === "register" && (
              <Register formKey={activeForm} onRegister={setUser} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;