const { Favorite } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    let favorite = await Favorite.findOne({ where: { id } });
    if (!favorite) {
      throw { name: "NotFound", message: "Favorite not found" };
    }

    if (favorite.UserId !== userId) {
      throw { name: "Forbidden", message: "You are not allowed" };
    }

    next();
  } catch (error) {
    console.log("🚀 ~ authorization ~ error:", error);
    next(error);
  }
}

module.exports = authorization;
