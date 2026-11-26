import express from "express";
import multer from "multer";
import path from "path";
import {
  createWatch,
  getAllWatches,
  getWatchById,
  updateWatch,
  deleteWatch,
} from "../Controller/watchproductController.js";
import { protect, admin } from "../middlewares/authmiddleware.js"; 


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadpro/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const uploadpro = multer({ storage });

router.get("/", getAllWatches);
router.get("/:id", getWatchById);
router.post("/",   protect, admin, uploadpro.array("images", 5), createWatch);
router.put("/:id",  protect, admin, uploadpro.array("images", 5), updateWatch);
router.delete("/:id",  protect, admin, deleteWatch);

export default router;
