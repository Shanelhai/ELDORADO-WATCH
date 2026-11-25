import React, { useEffect, useState } from "react";
import imagedate from "../home/imagedata.jsx";
import UserDate from "./userrating/usercart.jsx";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../navbar/routes.jsx";
import Footer from "../footer/footer.jsx";
import "./home.css";

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!imagedate.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagedate.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = imagedate[index] || {};

  return (
    <>
      <div className="home-atelier">
        <section className="atelier-hero">
          <div className="atelier-topbar">
            <span className="atelier-mark">ELDORADO WATCH</span>
            <span className="atelier-line" />
            <span className="atelier-edition">ATELIER EDITION</span>
          </div>

          <div className="atelier-stage">
            {/* Left Rail: Interactive Watch Index */}
            <aside className="atelier-rail" aria-label="Timepiece index">
              {imagedate.map((item, i) => (
                <button
                  key={item.id ?? i}
                  type="button"
                  className={`rail-item ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                >
                  <span className="rail-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="rail-name">{item.name}</span>
                </button>
              ))}
            </aside>

            {/* Center: Spotlight Pedestal */}
            <div className="atelier-pedestal">
              <div className="pedestal-ring">
                {imagedate.map((item, i) => (
                  <img
                    key={item.id ?? i}
                    src={item.image}
                    alt={item.name}
                    className={i === index ? "active" : ""}
                  />
                ))}
              </div>
              <div className="pedestal-caption">
                <span>TIMEPIECE NO. {String(index + 1).padStart(2, "0")}</span>
                <strong>{currentItem.name || ""}</strong>
              </div>
            </div>

            {/* Right: Editorial Details & Action */}
            <div className="atelier-dossier">
              <div className="dossier-slides">
                {imagedate.map((item, i) => (
                  <div
                    key={item.id ?? i}
                    className={`dossier-slide ${i === index ? "active" : ""}`}
                  >
                    <span className="dossier-eyebrow">SIGNATURE COLLECTION</span>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="dossier-footer">
                <button
                  type="button"
                  className="atelier-btn"
                  onClick={() => navigate(ROUTES.Watch.path)}
                >
                  <span>Book Now</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="atelier-reviews">
          <UserDate />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;