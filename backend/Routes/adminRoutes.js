import express from "express";
import { protect,  admin  } from "../middlewares/authmiddleware.js";


const router = express.Router();

router.get("/dashboard", protect,  admin, (req, res) => {
  res.json({ message: "Admin Dashboard",  admin: req.user.name });
});

export default router;
