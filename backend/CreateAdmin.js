import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./Models/User.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("admin@123", 10);

    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
