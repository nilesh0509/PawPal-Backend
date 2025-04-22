const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addPet, getAllPets, getPetByCategory, updatePet, deletePet } = require("../controllers/petController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/add", upload.single("image"), addPet);
router.get("/", getAllPets);
router.get("/category/:category", getPetByCategory);
router.put("/update/:id", upload.single("image"), updatePet);
router.delete("/delete/:id", deletePet);

module.exports = router;
