const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  imageUrl: { 
    type: String, 
    required: true, 
    default: "https://via.placeholder.com/400",
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(v); // URL format validation
      },
      message: "Please provide a valid image URL"
    }
  },
  title: { 
    type: String, 
    required: true,
    minlength: 3,  
    maxlength: 100
  }
});

module.exports = mongoose.model("Slider", sliderSchema);
