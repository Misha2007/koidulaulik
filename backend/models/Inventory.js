const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Item = require("./Item");

const Inventory = sequelize.define("Inventory", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Users", key: "id" },
    onDelete: "CASCADE",
  },
  inventoryItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Items", key: "id" },
    onDelete: "CASCADE",
  },
});

User.hasMany(Inventory, { foreignKey: "userId" });
Inventory.belongsTo(User, { foreignKey: "userId" });

Inventory.belongsTo(Item, { foreignKey: "inventoryItemId" });
Item.hasMany(Inventory, { foreignKey: "inventoryItemId" });

module.exports = Inventory;