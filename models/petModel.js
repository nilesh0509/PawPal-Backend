const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, 
  name: { type: String, required: true },
  breed: { type: String },
  age: { type: Number, required: true },
  category: {type: String, required: true},
  gender: {type: String, requried: true},
  weight: {type: Number, required: true},
  food: {type: String, required: true},
  address: { type: String },
  about: { type: String },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Pet", PetSchema);
