import express from "express";
import {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart
} from "../Controller/shoopingcartController.js";

import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove/:productId",protect, removeItem);
router.delete("/clear", protect, clearCart);

export default router;
