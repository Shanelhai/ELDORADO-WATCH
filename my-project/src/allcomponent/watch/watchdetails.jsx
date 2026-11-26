import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../navbar/navbar";
import "./watchdetails.css";
import Footer from "../footer/footer";

const WatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [watch, setWatch] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [origin, setOrigin] = useState("center center");

  const getWatchDetails = async () => {
    try {
      const res = await axios.get(`https://eldorado-watch.onrender.com/api/watches/${id}`);

      if (res.data?.success) {
        setWatch(res.data.watch);
        if (res.data.watch.image?.length > 0) {
          setSelectedImage(res.data.watch.image[0]);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load watch details");
    }
  };

  useEffect(() => {
    if (id) getWatchDetails();
  }, [id]);

  if (!watch) return <p className="loading-text">Loading watch details...</p>;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <>
      <div className="wdetails-container">
        <div className="wdetails-header">
          <span className="wdetails-eyebrow">ELDORADO WATCH</span>
          <h1 className="wdetails-title">{watch.title || "Watch Details"}</h1>
        </div>

        <div className="wdetails-content">
          {/* LEFT: Gallery & Actions */}
          <div className="wdetails-left">
            <div
              className="zoom-container"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => {
                setZoomLevel(1);
                setOrigin("center center");
              }}
            >
              <img
                src={`https://eldorado-watch.onrender.com/uploadPro/${selectedImage}`}
                alt={watch.title}
                className="zoom-image"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: origin,
                }}
                onError={(e) => (e.target.src = "/no-image.png")}
              />

              <div className="zoom-controls">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 3))}
                  aria-label="Zoom in"
                >
                  ＋
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.5, 1))}
                  aria-label="Zoom out"
                >
                  −
                </button>
              </div>
            </div>

            <div className="wdetails-thumbnails">
              {watch.image?.map((img, i) => (
                <img
                  key={i}
                  src={`https://eldorado-watch.onrender.com/uploadPro/${img}`}
                  alt="thumb"
                  onClick={() => {
                    setSelectedImage(img);
                    setZoomLevel(1);
                  }}
                  className={selectedImage === img ? "active-thumb" : ""}
                />
              ))}
            </div>

            <div className="wdetails-buttons">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate(ROUTES.Shoopingcart.path)}
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* RIGHT: Specifications */}
          <div className="wdetails-right">
            <div className="wdetails-section">
              <h3>Basic Information</h3>
              <div className="spec-list">
                <p><strong>Title:</strong> <span>{watch.title}</span></p>
                <p><strong>Brand:</strong> <span>{watch.brand}</span></p>
                <p><strong>Rating:</strong> <span>★ {watch.rating}</span></p>
                <p><strong>Category:</strong> <span>{watch.category?.name}</span></p>
              </div>
            </div>

            <div className="wdetails-section">
              <h3>Specifications</h3>
              <div className="spec-list">
                <p><strong>Model:</strong> <span>{watch.model}</span></p>
                <p><strong>Color:</strong> <span>{watch.color}</span></p>
                <p><strong>Strap:</strong> <span>{watch.strap}</span></p>
                <p><strong>Dial:</strong> <span>{watch.dial}</span></p>
              </div>
            </div>

            <div className="wdetails-section">
              <h3>Price &amp; Description</h3>
              <div className="spec-list">
                <p><strong>Price:</strong> <span>₹{watch.price}</span></p>
                <p><strong>Discount:</strong> <span>{watch.discount}%</span></p>
                <p className="total-price-row">
                  <strong>Total Price:</strong> <span>₹{watch.totalprice}</span>
                </p>
              </div>
              <p className="wdetails-desc">
                <strong>Description:</strong> {watch.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WatchDetails;