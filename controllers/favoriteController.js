const Favorite = require("../models/favoriteModel");
const Pet = require("../models/petModel"); 
const User = require("../models/userModel");

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).populate({
      path: "pet",
      select: "name breed age imageUrl description"
    });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch favorites",
      error: error.message
    });
  }
};

exports.addToFavorites = async (req, res) => {
  try {
    const { petId } = req.body;

    if (!petId) {
      return res.status(400).json({ message: "Pet ID is required" });
    }

    const petExists = await Pet.findById(petId);
    if (!petExists) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const alreadyFavorited = await Favorite.findOne({
      user: req.user._id,
      pet: petId
    });

    if (alreadyFavorited) {
      return res.status(400).json({ message: "Pet already in favorites" });
    }

    const newFavorite = new Favorite({
      user: req.user._id,
      pet: petId
    });

    await newFavorite.save();

    res.status(201).json({
      message: "Pet added to favorites successfully",
      petId: newFavorite.pet
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add to favorites",
      error: error.message
    });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const petId = req.params.petId;

    const result = await Favorite.findOneAndDelete({
      user: req.user._id,
      pet: petId
    });

    if (!result) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Pet removed from favorites successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove from favorites",
      error: error.message
    });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const petId = req.params.petId;

    const favorite = await Favorite.findOne({
      user: req.user._id,
      pet: petId
    });

    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    res.status(500).json({
      message: "Failed to check favorite status",
      error: error.message
    });
  }
};
