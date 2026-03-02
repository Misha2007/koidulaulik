const Inventory = require("../models/Inventory");
const Item = require("../models/Item");
const Article = require("../models/Article");

exports.createInventory = async (req, res) => {
  try {
    const { userId } = req.body;

    const items = await Article.findAll({ order: Inventory.sequelize.literal("RAND()"), limit: 4 });
    if (items.length < 4) return res.status(400).json({ error: "Not enough articles" });

    const item = await Item.create({
      article1Id: items[0].id,
      article2Id: items[1].id,
      article3Id: items[2].id,
      article4Id: items[3].id,
    });

    const inventory = await Inventory.create({ userId, inventoryItemId: item.id });

    res.status(201).json({ inventory, articles: items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInventoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const inventory = await Inventory.findAll({
      where: { userId },
      include: [
        {
          model: Item,
        },
      ],
    });

    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};