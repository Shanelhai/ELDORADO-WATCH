import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories
} from "../Controller/categoryContoller.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/", protect, createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
