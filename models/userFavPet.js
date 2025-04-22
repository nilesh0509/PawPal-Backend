const mongoose = require('mongoose');

const UserFavPetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  favorites: { type: [String], default: [] } 
});

module.exports = mongoose.model('UserFavPet', UserFavPetSchema);
