const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Assuming the `protect` middleware is used for authentication
const {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  checkFavorite
} = require("../controllers/favoriteController");

router.use(protect);
router.get("/", getFavorites);
router.post("/add", addToFavorites);
router.delete("/:petId", removeFromFavorites);
router.get("/check/:petId", checkFavorite);

module.exports = router;
