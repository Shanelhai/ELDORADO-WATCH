import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./watch.css";
import Footer from "../footer/footer";

const Watch = () => {
    const [watches, setWatches] = useState([]);
    const navigate = useNavigate();

    const getWatches = async () => {
        try {
            const res = await axios.get("https://eldorado-watch.onrender.com/api/watches");
            if (res.data.success) setWatches(res.data.watches);
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to load watches");
        }
    };

    useEffect(() => {
        getWatches();
    }, []);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(
                "https://eldorado-watch.onrender.com/api/cart/add",
                {
                    productId: productId,   
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product added to cart");
            navigate("/shoopingcart");

        } catch (error) {
            console.error("Add to cart error:", error.response?.data);
            alert(error.response?.data?.message || "Failed to add to cart");
        }
    };

   const handleDetailsClick = (id) => {
        console.log("ID:", id);
        navigate(`/watchdetails/${id}`);
    };

    return (
        <>
            <div className="watch-containers">
                {watches.map((watch) => (
                    <div className="watch-cards" key={watch._id}>
                        <img
                            src={`https://eldorado-watch.onrender.com/uploadPro/${watch.image[0]}`}
                            alt={watch.title}
                            onError={(e) => (e.target.src = "/no-image.png")}
                        />
                        <div className="watch-cards-body">
                            <div className="header-rows">
                                <span className="brands">{watch.title}</span>
                                <span className="discounts">{watch.discount}%</span>
                                <span className="ratings">{watch.rating} ⭐</span>
                            </div>
                            <p className="descriptions">{watch.description}</p>
                            <p className="prices">₹ {watch.totalprice}</p>
                            <div className="watch-buttons">
                                <button className="watch-btn-adds" onClick={() => handleAddToCart(watch._id)}>Add to Cart</button>
                                <button className="watch-btn-detailss" onClick={() => handleDetailsClick(watch._id)}>Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    );
};

export default Watch;
