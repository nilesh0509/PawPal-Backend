const Slider = require("./../models/sliderModel");

const DEFAULT_IMAGE = "https://via.placeholder.com/400"; 

exports.getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);  
  } catch (error) {
    res.status(500).json({ message: "Error fetching sliders", error: error.message });
  }
};

exports.addSlider = async (req, res) => {
  try {
    const { imageUrl, title } = req.body;

    if (!title || title.length < 3 || title.length > 100) {
      return res.status(400).json({ message: "Title must be between 3 and 100 characters." });
    }

    const newSlide = new Slider({
      imageUrl: imageUrl || DEFAULT_IMAGE, 
      title
    });

    await newSlide.save();
    res.status(201).json({ message: "Slide added successfully", newSlide });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", error: error.message });
    }
    res.status(500).json({ message: "Error adding slide", error: error.message });
  }
};
