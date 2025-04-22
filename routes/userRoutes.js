const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const router = express.Router();
const User = require("./../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || KaushikiNilesh

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: { id: user._id, username: user.name } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, username: user.name } });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/users", async (req, res) => {

    try {
      const users = await User.find();
      console.log(User)
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
