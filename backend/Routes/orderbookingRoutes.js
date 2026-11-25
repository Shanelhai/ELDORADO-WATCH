import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus
} from "../Controller/orderbookingController.js";
import { protect, admin } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.get("/", getAllOrders);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
