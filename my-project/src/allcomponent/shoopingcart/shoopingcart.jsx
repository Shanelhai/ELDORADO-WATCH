import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./shoopingcart.css";
import Footer from "../footer/footer";

const Shoopingcart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5001/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error("Cart Error:", error.response?.data || error.message);
      alert("Failed to load cart. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        "http://localhost:5001/api/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      getCart();
    } catch (error) {
      console.error("Update Quantity Error:", error.response?.data || error.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      getCart();
    } catch (error) {
      console.error("Remove Item Error:", error.response?.data || error.message);
    }
  };

  const getTotal = () => {
    if (!cart) return 0;
    return cart.items.reduce(
      (total, item) => total + item.productId.totalprice * item.quantity,
      0
    );
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart-box">
          <span className="cart-eyebrow">ELDORADO WATCH</span>
          <h2 className="empty-cart">🛒 Your cart is empty</h2>
          <button
            type="button"
            className="empty-shop-btn"
            onClick={() => navigate("/watch")}
          >
            Explore Timepieces
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="cart-page">
        <div className="cart-top-banner">
          <span className="cart-eyebrow">ELDORADO WATCH · BAG</span>
          <h1>Shopping Cart</h1>
          <p className="cart-subtitle">
            Review your selected timepieces, adjust quantities, or proceed to checkout.
          </p>
        </div>

        <div className="cart-main-container">
          <div className="cart-items-container">
            <div className="cart-items-head">
              <h2>Selected Items</h2>
              <span>{String(cart.items.length).padStart(2, "0")} ITEMS</span>
            </div>

            {cart.items.map((item) => (
              <div className="cart-item" key={item.productId._id}>
                <div className="cart-img">
                  <img
                    src={`http://localhost:5001/uploadPro/${item.productId.image[0]}`}
                    alt={item.productId.title}
                    onError={(e) => (e.target.src = "/no-image.png")}
                  />
                </div>
                <div className="cart-details">
                  <h3 className="product-title">{item.productId.title}</h3>
                  <p className="product-desc">{item.productId.description}</p>

                  <div className="price-qty">
                    <div className="price-group">
                      <span className="price">₹ {item.productId.totalprice}</span>
                      <span className="line-subtotal">
                        Subtotal: ₹ {item.productId.totalprice * item.quantity}
                      </span>
                    </div>

                    <div className="qty-remove-row">
                      <div className="qty-control">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId._id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId._id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeItem(item.productId._id)}
                      >
                        Remove
                      </button>

                      <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
                      >
                        ← Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <div className="cart-summary-head">
              <span className="cart-summary-dot" />
              <h2>Order Summary</h2>
            </div>

            <div className="cart-summary-body">
              <div className="summary-row">
                <span>Total Items</span>
                <strong>{cart.items.length}</strong>
              </div>
              <div className="summary-row total">
                <span>Total Price</span>
                <strong>₹ {getTotal()}</strong>
              </div>
              <button
                type="button"
                className="checkout-btn"
                onClick={() => navigate("/orderbooking", { state: { cart } })}
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shoopingcart;