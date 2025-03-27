const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let bearerToken = req.headers.authorization;
    console.log("🚀 ~ authentication ~ bearerToken:", bearerToken);

    if (!bearerToken) {
      throw { name: "Unauthorized", message: "token is required" };
    }

    const [, token] = bearerToken.split(" ");

    let data = verifyToken(token);

    if (!data) {
      throw { name: "Unauthorized", message: "token is required" };
    }

    let user = await User.findByPk(data.id);

    if (!user) {
      throw { name: "Unauthorized", message: "token is required" };
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("🚀 ~ authentication ~ error:", error);
    next(error);
  }
}

module.exports = authentication;
