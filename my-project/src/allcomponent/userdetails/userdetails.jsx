import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userdetails.css";
import Footer from "../footer/footer";

const UserDetails = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLoginHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://eldorado-watch.onrender.com/api/auth/login-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);
    } catch (err) {
      setError("Failed to load login history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoginHistory();
  }, []);

  if (loading) {
    return (
      <div className="login-history-page">
        <p className="loading-text">Loading login history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="login-history-page">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="login-history-page">
        <div className="userdetails-top-banner">
          <span className="userdetails-eyebrow">ELDORADO WATCH · ADMIN</span>
          <h1 className="userdetails-page-title">User Login History</h1>
          <p className="userdetails-page-subtitle">
            Monitor recent member and administrator sign-in sessions, devices, and IP activity.
          </p>
        </div>

        <div className="history-card">
          <div className="history-header">
            <div className="history-header-left">
              <span className="history-dot" />
              <h2>Session Audit Log</h2>
            </div>
            <span className="history-count">
              {String(history.length).padStart(2, "0")} SESSIONS
            </span>
          </div>

          <div className="table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Device</th>
                  <th>IP</th>
                  <th>Login Time</th>
                </tr>
              </thead>

              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      No login history found
                    </td>
                  </tr>
                ) : (
                  history.map((item, index) => (
                    <tr key={item._id}>
                      <td>
                        <span className="row-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </td>
                      <td className="user-name-cell">{item.user?.name || "-"}</td>
                      <td className="user-email-cell">{item.user?.email || "-"}</td>
                      <td>
                        <span className={`role-badge ${item.user?.role || "user"}`}>
                          {item.user?.role || "user"}
                        </span>
                      </td>
                      <td className="device">
                        {item.device?.slice(0, 50) || "-"}
                      </td>
                      <td className="ip-cell">{item.ip || "-"}</td>
                      <td className="time-cell">
                        {item.loginAt ? new Date(item.loginAt).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;