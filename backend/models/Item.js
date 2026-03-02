const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Article = require("./Article");

const Item = sequelize.define("Item", {
  article1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Articles", key: "id" }, 
    onDelete: "CASCADE",
  },
  article2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Articles", key: "id" },
    onDelete: "CASCADE",
  },
  article3Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Articles", key: "id" },
    onDelete: "CASCADE",
  },
  article4Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Articles", key: "id" },
    onDelete: "CASCADE",
  },
});

module.exports = Item;