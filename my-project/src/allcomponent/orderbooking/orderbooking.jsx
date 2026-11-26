import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./orderbooking.css";
import Footer from "../footer/footer";

const OrderBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart;

  const [user, setUser] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        localStorage.clear();
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!cart) {
    return (
      <div className="order-pages">
        <div className="order-empty-state">
          <span className="order-eyebrow">ELDORADO WATCH</span>
          <h2 className="empty">No items to checkout</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="order-pages">
        <p className="order-loading-text">Loading user info...</p>
      </div>
    );
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.productId.totalprice * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      alert("Please enter shipping address");
      return;
    }

    const items = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.totalprice,
    }));

    try {
      setLoading(true);

      await api.post("/orders", {
        userId: user._id,
        items,
        totalAmount,
        paymentMethod,
        shippingAddress,
        userDetails: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          address: user.address,
          location: user.location,
        },
      });

      alert("✅ Order placed successfully! Check your email 📧");
      navigate("/");
    } catch (error) {
      alert("❌ Order failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="order-pages">
        <div className="order-top-banner">
          <span className="order-eyebrow">ELDORADO WATCH · CHECKOUT</span>
          <h1>Checkout</h1>
          <p className="order-subtitle">
            Confirm your selected timepieces, delivery address, and preferred payment method.
          </p>
        </div>

        <div className="order-containers">
          {/* LEFT - ITEMS */}
          <div className="order-items">
            <div className="order-section-header">
              <h2>Selected Timepieces</h2>
              <span>{String(cart.items.length).padStart(2, "0")} ITEMS</span>
            </div>

            {cart.items.map((item) => (
              <div className="order-item" key={item.productId._id}>
                <img
                  src={`https://eldorado-watch.onrender.com/uploadPro/${item.productId.image[0]}`}
                  alt={item.productId.title}
                  onError={(e) => (e.target.src = "/no-image.png")}
                />
                <div className="order-item-details">
                  <div className="order-item-top">
                    <h3>{item.productId.title}</h3>
                    <span className="order-qty-pill">Qty: {item.quantity}</span>
                  </div>
                  <p className="order-item-desc">{item.productId.description}</p>
                  <div className="order-item-meta">
                    <span className="order-unit-price">
                      ₹ {item.productId.totalprice}
                    </span>
                    <span className="order-line-total">
                      Subtotal: ₹ {item.productId.totalprice * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <aside className="order-summarys">
            <div className="summary-card-head">
              <span className="summary-dot" />
              <h2>Order Summary</h2>
            </div>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Total Items</span>
                <strong>{cart.items.length}</strong>
              </div>
              <div className="summary-row totals">
                <span>Total Amount</span>
                <strong>₹ {totalAmount}</strong>
              </div>
            </div>

            <div className="summary-field">
              <label htmlFor="shipping-address-input">Shipping Address</label>
              <textarea
                id="shipping-address-input"
                rows="3"
                placeholder="Enter shipping address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>

            <div className="payments">
              <span className="payments-label">Payment Method</span>

              <label className={`payment-option ${paymentMethod === "COD" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <span>Cash on Delivery</span>
              </label>

              <label className={`payment-option ${paymentMethod === "ONLINE" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "ONLINE"}
                  onChange={() => setPaymentMethod("ONLINE")}
                />
                <span>Online Payment</span>
              </label>
            </div>

            <button
              type="button"
              className="btn-Orders"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderBooking;