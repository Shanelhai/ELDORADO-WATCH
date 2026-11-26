import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import categoryRoutes from "./Routes/categoryRoutes.js";
import watchproductRoutes from "./Routes/watchproductRoutes.js"
import shoopintcartRoutes from "./Routes/shoopingcartRoutes.js";
import orderbookingRoutes from "./Routes/orderbookingRoutes.js";



dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: ["http://localhost:5173", "https://eldorado-watch-ivory.vercel.app"],
  credentials: true                
}));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/watches", watchproductRoutes);
app.use("/api/cart", shoopintcartRoutes);
app.use("/api/orders", orderbookingRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "working" });
});


// Serve static files
app.use("/uploadPro", express.static("uploadPro"));


mongoose.connect(process.env.DB_URL)
    .then(()=>{
    app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port : ",process.env.PORT);
});
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error);
})