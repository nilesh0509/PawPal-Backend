const Category = require("./../models/categoryModel");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    const newCategory = new Category({ name, imageUrl });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Failed to add category", error: error.message });
  }
};
