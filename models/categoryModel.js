const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(v);
      },
      message: "Please provide a valid image URL."
    }
  }
});

module.exports = mongoose.model("Category", categorySchema);
