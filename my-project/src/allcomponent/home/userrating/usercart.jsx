import React, { useState, useEffect } from "react";
import UserDate from "./userdate";
import "./usercart.css";

const UserCart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % UserDate.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const visibleCount = Math.min(3, UserDate.length);
  const visibleUsers = Array.from({ length: visibleCount }, (_, i) => {
    return UserDate[(currentIndex + i) % UserDate.length];
  });

  return (
    <div className="testimonial-section">
      <div className="testimonial-header">
        <span className="testimonial-eyebrow">VERIFIED REVIEWS</span>
        <h2 className="section-heading">What Our Collectors Say</h2>
      </div>

      {/* key={currentIndex} triggers smooth slide animation on every auto-change */}
      <div className="cards-container" key={currentIndex}>
        {visibleUsers.map((user, i) => (
          <article
            className="testimonial-card"
            key={user.id}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="card-top">
              <div className="avatar">{getInitials(user.name)}</div>
              <div className="user-meta">
                <h4 className="user-name">{user.name}</h4>
                <span className="user-role">{user.role}</span>
              </div>
              <span className="rating-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </span>
            </div>

            <h3 className="card-title">“{user.title}”</h3>
            <p className="card-content">{user.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UserCart;