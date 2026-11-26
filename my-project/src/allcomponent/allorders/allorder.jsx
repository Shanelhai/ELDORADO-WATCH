import React, { useEffect, useState } from "react";
import axios from "axios";
import "./allorder.css";
import Footer from "../footer/footer";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://eldorado-watch.onrender.com/api/orders", {
          withCredentials: true,
        });
        setOrders(response.data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err.response || err);
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="all-orders-container">
        <p className="loading-text">Loading all orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-orders-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="all-orders-container">
        <div className="orders-top-banner">
          <span className="orders-eyebrow">ELDORADO WATCH · ADMIN</span>
          <h1>All Orders</h1>
        </div>
        <div className="orders-card">
          <p className="no-data">No orders found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="all-orders-container">
        <div className="orders-top-banner">
          <span className="orders-eyebrow">ELDORADO WATCH · ADMIN</span>
          <h1>All Orders</h1>
          <p className="orders-subtitle">
            Review customer orders, timepiece quantities, payment modes, and fulfillment status.
          </p>
        </div>

        <div className="orders-card">
          <div className="orders-card-header">
            <div className="orders-header-left">
              <span className="orders-dot" />
              <h2>Order Ledger</h2>
            </div>
            <span className="orders-count">
              {String(orders.length).padStart(2, "0")} ORDERS
            </span>
          </div>

          <div className="table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Shipping Address</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="order-user-cell">{order.userId?.name || "N/A"}</td>
                    <td>{order.userId?.email || "N/A"}</td>
                    <td>{order.userId?.phone || "N/A"}</td>
                    <td>{order.userId?.city || "N/A"}</td>
                    <td className="order-address-cell">{order.shippingAddress || "N/A"}</td>
                    <td className="items-list">
                      {order.items.map((item) => (
                        <div key={item._id} className="order-item-line">
                          <span>{item.productId?.title || "N/A"}</span>
                          <strong>× {item.quantity}</strong>
                        </div>
                      ))}
                    </td>
                    <td className="order-amount-cell">₹ {order.totalAmount}</td>
                    <td>
                      <span className="payment-pill">{order.paymentMethod || "N/A"}</span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${(order.orderStatus || "").toLowerCase()}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllOrders;