import express from "express";
import User from "../Model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import middleware from "../middleware/middleware.js";
const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECKING IF EMAIL ALREADY EXIST
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ success: false, message: "User already existed" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ success: true, message: "Accounted created successfully" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error in Adding User" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECKING IF EMAIL ALREADY EXIST
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not existed" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "6h",
    });

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "Login successfully",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Error in Adding Login" });
  }
});

router.get("/verify", middleware, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});
export default router;
