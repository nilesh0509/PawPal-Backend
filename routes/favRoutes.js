const express =  require('express');
const favController = require('../controllers/favController');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { user } = req.query;  // Assume user comes as query param (or from middleware)
    const favorites = await favoriteController.GetFavList(user);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { user, favorites } = req.body;  // Assuming user identifier and favorites list
    const result = await favoriteController.UpdateFav(user, favorites);
    if (result) {
      res.json({ message: "Favorites updated successfully" });
    } else {
      res.status(400).json({ message: "Failed to update favorites" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating favorites" });
  }
});

module.exports = router;
