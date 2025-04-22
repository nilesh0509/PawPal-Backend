const mongoose = require("mongoose");
const Slider = require("./models/sliderModel");
const Pet = require("./models/petModel")
require("dotenv").config();
const connectDB = require("./config/db"); // Your custom database connection


// Connect to MongoDB
connectDB();

// Default slider data
const sliderData = [
  {
    // imageUrl: "https://source.unsplash.com/400x300/?puppy",
    imageUrl: "/uploads/slide1.jpg",
    title: "Adopt a Cute Puppy!"
  },
  {
    // imageUrl: "https://source.unsplash.com/400x300/?kitten",
    imageUrl: "/uploads/slide2.jpg",
    title: "Find Your New Best Friend"
  },
  {
    // imageUrl: "https://source.unsplash.com/400x300/?dog",
    imageUrl: "/uploads/slide3.jpg",
    title: "Rescue and Rehome Pets"
  }
];

// Insert default slides
const seedDatabase = async () => {
  try {
    await Slider.deleteMany(); // Clear existing slides
    await Slider.insertMany(sliderData);
    console.log("Default slides added!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

//Insert Pets
const seedPets = async () => {
  try {
    await Pet.deleteMany(); // Clear existing data

    const pets = [
      { name: "Golden Retriever", category: "Dog", imageUrl: "/uploads/dog1.jpg" },
      { name: "Persian Cat", category: "Cat", imageUrl: "/uploads/cat1.jpg" },
      { name: "Macaw", category: "Bird", imageUrl: "/uploads/bird1.jpg" },
      { name: "Siberian Husky", category: "Dog", imageUrl: "/uploads/dog2.jpg" },
    ];

    await Pet.insertMany(pets);
    console.log("Database Seeded!");
    process.exit();
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedPets();

seedDatabase();
