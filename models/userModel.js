const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
    trim: true,
},
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    trim: true,
},
  password: {
    type: String,
    required: [true, 'Please enter password'],
    min: 6,
    max: 18,
    trim: true,
},
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
