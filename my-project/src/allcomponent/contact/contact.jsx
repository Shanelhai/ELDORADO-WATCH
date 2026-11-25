import React, { useState } from "react";
import "./contact.css";
import Footer from "../footer/footer";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "General Inquiry",
            message: "",
        });
    };

    return (
        <>
            <section className="contact-page">
                {/* Hero Header */}
                <div className="contact-hero">
                    <span className="contact-eyebrow">ELDORADO WATCH</span>
                    <h1 className="contact-title">Get in Touch</h1>
                    <p className="contact-subtitle">
                        Private consultations, watch servicing, bespoke orders, or general inquiries —
                        our concierge team is here to assist you.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="contact-container">
                    {/* Left: Contact Details */}
                    <div className="contact-info">
                        <h2 className="section-heading">Concierge &amp; Boutiques</h2>
                        <p className="info-intro">
                            Reach out directly for personalized guidance on timepieces, authenticity,
                            and after-sales care.
                        </p>

                        <div className="info-cards">
                            <div className="info-card">
                                <span className="info-label">Flagship Boutique</span>
                                <p className="info-value">
                                    Connaught Place, New Delhi, India
                                </p>
                            </div>

                            <div className="info-card">
                                <span className="info-label">Email</span>
                                <p className="info-value">concierge@eldoradowatch.com</p>
                            </div>

                            <div className="info-card">
                                <span className="info-label">Phone</span>
                                <p className="info-value">+91 98765 43210</p>
                            </div>

                            <div className="info-card">
                                <span className="info-label">Hours</span>
                                <p className="info-value">Mon – Sat: 10:30 AM – 8:30 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Inquiry Form */}
                    <div className="contact-form-wrapper">
                        <h2 className="section-heading">Send a Message</h2>

                        {submitted && (
                            <div className="form-success">
                                Thank you for contacting <strong>ELDORADO WATCH</strong>. Our team
                                will respond shortly.
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone (Optional)</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Topic</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Book a Viewing">Book a Viewing</option>
                                        <option value="Watch Servicing & Warranty">
                                            Watch Servicing &amp; Warranty
                                        </option>
                                        <option value="Corporate & Gifting">
                                            Corporate &amp; Gifting
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell us which timepiece or service you are interested in..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-btn">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;