const Inventory = require("../models/Inventory");
const Item = require("../models/Item");
const Article = require("../models/Article");
const { Op } = require("sequelize");

exports.createInventory = async (req, res) => {
  try {
    const { userId } = req.body;

    const lastInventoryItem = await Inventory.findOne({
      include: { model: Item },
      order: [["id", "DESC"]],
    });

    const startId = lastInventoryItem
      ? lastInventoryItem.inventoryItem.article4Id
      : 0;

    const articles = await Article.findAll({
      where: { id: { [Op.gt]: startId } },
      order: [["id", "ASC"]],
      limit: 4,
    });

    if (articles.length < 4) {
      return res
        .status(400)
        .json({ error: "Not enough articles to create inventory" });
    }

    const item = await Item.create({
      article1Id: articles[0].id,
      article2Id: articles[1].id,
      article3Id: articles[2].id,
      article4Id: articles[3].id,
    });

    const inventory = await Inventory.create({
      userId,
      inventoryItemId: item.id,
    });

    res.status(201).json({ inventory, articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getInventoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const inventory = await Inventory.findAll({
      where: { userId },
      include: { model: Item },
      order: [["id", "ASC"]],
    });

    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
