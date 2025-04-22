const UserFavPet = require("../models/userFavPet")

/**
 * Gets the favorite pet list for a user
 * @param {Object} user - The user object from Clerk
 * @returns {Object} An object containing the favorites array
 */
exports.GetFavList = async () => {
  try {
    const userIdentifier = getUserIdentifier(user);
    
    if (!userIdentifier) {
      console.error("No valid identifier found for user");
      return { favorites: [] };
    }

    console.log(`Getting favorites for user: ${userIdentifier}`);
    const userFavPet = await UserFavPet.findOne({ email: userIdentifier });

    if (userFavPet) {
      return { email: userFavPet.email, favorites: userFavPet.favorites };
    } else {
      console.log("No favorites document exists, creating new one");

      const newUserFavPet = new UserFavPet({
        email: userIdentifier,
        favorites: [],
      });

      await newUserFavPet.save();
      return { email: newUserFavPet.email, favorites: [] };
    }
  } catch (error) {
    console.error("Error in GetFavList:", error);
    return { favorites: [] };
  }
};

/**
 * Updates the favorite pet list for a user
 * @param {Object} user - The user object from Clerk
 * @param {Array} favorites - Array of pet IDs to save as favorites
 * @returns {boolean} Success status
 */
exports.UpdateFav = async (user, favorites) => {
  try {
    const userIdentifier = getUserIdentifier(user);
    
    if (!userIdentifier) {
      console.error("No valid identifier found for user");
      return false;
    }

    const safeArray = Array.isArray(favorites) ? favorites : [];
    console.log(`Updating favorites for ${userIdentifier} with ${safeArray.length} items:`, safeArray);

    const updatedUserFavPet = await UserFavPet.findOneAndUpdate(
      { email: userIdentifier },
      { $set: { favorites: safeArray } },
      { new: true, upsert: true }
    );

    console.log("Favorites updated successfully for user:", userIdentifier);
    return true;
  } catch (error) {
    console.error("Error in UpdateFav:", error);
    return false;
  }
};

