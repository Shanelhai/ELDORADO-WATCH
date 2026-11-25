import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import Navbar from "./navbar";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {Object.entries(ROUTES).map(([key, route]) => (
          <Route key={key} path={route.path} element={route.element} />
        ))}
        <Route
          path="*"
          element={
            <main
              style={{
                padding: "140px 24px",
                textAlign: "center",
                backgroundColor: "#ffffff",
                color: "#111111",
                minHeight: "70vh",
              }}
            >
              <h1>404 - Page Not Found</h1>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;