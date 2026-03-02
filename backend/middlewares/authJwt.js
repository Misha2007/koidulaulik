const jwt = require("jsonwebtoken");
const db = require("../config/db.js");
const authConfig = require("../config/auth.config.js");
const User = require("../models/User.js");

async function verifyToken(req, res, next) {
  const headerToken =
    req.headers["x-access-token"] || req.headers["authorization"];

  console.log("headerToken", headerToken);

  if (!headerToken) {
    return res.status(403).json({ message: "No token provided!" });
  }

  const token = headerToken.startsWith("Bearer ")
    ? headerToken.slice(7)
    : headerToken;

  console.log("token", token);

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    console.log("Decoded JWT:", decoded);

    req.user = req.user || {};
    req.user.userId = decoded.userId;

    const user = await User.findByPk(req.user.userId);
    console.log("Found user:", req.user.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized! User not found" });
    }

    req.user = user;
    console.log("[Server]: User added to req object:", req.user);

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    }

    return res
      .status(401)
      .json({ message: "Unauthorized!", error: err.message });
  }
}

module.exports = verifyToken;
