require("dotenv").config();

const authConfig = {
  secret: process.env.secret,
};

module.exports = authConfig;
