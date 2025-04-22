const Pet = require("../models/petModel");

exports.addPet = async (req, res) => {
  try {
    const { name, breed, age, about, address, category, gender, weight, food } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : 'https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg'; 

    if (!name || !breed || !age || !about || !address || !category || !gender || !weight || !food) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    const pet = new Pet({
      name,
      breed,
      age,
      about,
      address,
      category,
      gender,
      weight,
      food,
      imageUrl,
    });

    await pet.save();
    res.status(201).json({ message: "Pet added successfully", pet });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    if (process.env.NODE_ENV === 'development') {
      console.log(pets); 
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getPetByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const pets = await Pet.find({ category: category });

    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: `No pets found in the "${category}" category.` });
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(pets); 
    }
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pets", error: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, updateData, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet updated successfully", updatedPet });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
