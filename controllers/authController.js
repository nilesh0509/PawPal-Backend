const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).send({
      success: false,
      message: "Name is required",
    });
  }
  if (!email) {
    return res.status(400).send({
      success: false,
      message: "Email is required",
    });
  }
  if (!password || password.length < 6) {
    return res.status(400).send({
      success: false,
      message: "Password is required & 6 Charecter",
    });
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(500).send({
      success: false,
      message: "Email is already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).send({
        success: false,
        message: 'Please provide Email or Password'
    })
}
  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token });
};
