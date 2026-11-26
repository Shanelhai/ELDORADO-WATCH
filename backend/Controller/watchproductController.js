import Watch from "../Models/Watchproduct.js";
import fs from "fs";
import path from "path";

const deleteImages = (filenames) => {
  if (!Array.isArray(filenames)) return;

  filenames.forEach((filename) => {
    const filePath = path.join(process.cwd(), "uploadpro", filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};


export const createWatch = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Images are required" });
    }

    const watch = new Watch({
      title: req.body.title,
      brand: req.body.brand,
      model: req.body.model,
      color: req.body.color,
      strap: req.body.strap,
      dial: req.body.dial,
      description: req.body.description,
      category: req.body.category,

      price: Number(req.body.price),
      discount: Number(req.body.discount || 0),
      stock: Number(req.body.stock || 0),
      rating: Number(req.body.rating || 0),
      isActive: req.body.isActive === "true" || req.body.isActive === true,

      image: req.files.map((file) => file.filename),
    });

    await watch.save();

    res.status(201).json({
      success: true,
      message: "Watch created successfully",
      watch,
    });
  } catch (error) {
    console.error("CREATE WATCH ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllWatches = async (req, res) => {
  try {
    const watches = await Watch.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, watches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWatchById = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id).populate("category", "name");

    if (!watch) {
      return res.status(404).json({ success: false, message: "Watch not found" });
    }

    res.status(200).json({ success: true, watch });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWatch = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (!watch) return res.status(404).json({ success: false, message: "Watch not found" });

    const fields = [
      "title", "brand", "model", "color", "strap", "dial",
      "description", "category", "isActive"
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) watch[field] = req.body[field];
    });

    if (req.body.price) watch.price = Number(req.body.price);
    if (req.body.discount) watch.discount = Number(req.body.discount);
    if (req.body.stock) watch.stock = Number(req.body.stock);
    if (req.body.rating) watch.rating = Number(req.body.rating);

    if (req.files && req.files.length > 0) {
      deleteImages(watch.image);
      watch.image = req.files.map((file) => file.filename);
    }

    await watch.save();

    res.status(200).json({
      success: true,
      message: "Watch updated successfully",
      watch,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWatch = async (req, res) => {
  try {
    const watch = await Watch.findById(req.params.id);
    if (!watch) return res.status(404).json({ success: false, message: "Watch not found" });

    deleteImages(watch.image);
    await watch.deleteOne();

    res.status(200).json({
      success: true,
      message: "Watch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
