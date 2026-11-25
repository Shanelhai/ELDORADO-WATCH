import React from "react";
import aboutData from "../about/aboutdata.jsx";
import "./about.css";
import Footer from "../footer/footer.jsx";

const About = () => {
  const { about, stats, whyChoose, values, team, closing } = aboutData;

  return (
    <>
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <span className="hero-eyebrow">{about.hero.title}</span>
          <h1>{about.hero.brand}</h1>
          <p className="tagline">{about.hero.tagline}</p>
          <p className="intro">{about.hero.intro}</p>
        </section>

        {/* Brand Story / Description */}
        <section className="about-story">
          <div className="story-grid">
            {about.description.map((text, index) => (
              <div key={index} className="story-item">
                <span className="story-number">0{index + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Banner */}
        <section className="about-stats">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-box">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Why Choose Us */}
        {whyChoose && (
          <section className="about-why">
            <h2 className="section-title">{whyChoose.title}</h2>
            <div className="why-grid">
              {whyChoose.points.map((point, index) => (
                <div key={index} className="why-card">
                  <span className="why-check">✓</span>
                  <p>{point}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Our Values */}
        <section className="about-values">
          <h2 className="section-title">OUR VALUES</h2>
          <div className="values-grid">
            {values.map((item) => (
              <div key={item.id} className="value-card">
                <div className="value-img-wrap">
                  <img src={item.image} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet The Team */}
        <section className="about-team">
          <h2 className="section-title">MEET THE TEAM</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.id} className="team-card">
                <img src={member.image} alt={member.name} />
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing Quote */}
        <section className="about-closing">
          <div className="closing-box">
            <p>“{closing}”</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;