const Item = require("../models/Item");
const Article = require("../models/Article");
const { Op } = require("sequelize");

exports.createSequentialItem = async (req, res) => {
  try {
    const lastItem = await Item.findOne({
      order: [["id", "DESC"]],
    });

    const startId = lastItem ? lastItem.article4Id : 0;

    const articles = await Article.findAll({
      where: { id: { [Op.gt]: startId } },
      order: [["id", "ASC"]],
      limit: 4,
    });

    if (articles.length < 4) {
      return res.status(400).json({ error: "Not enough articles to create a new Item" });
    }

    const item = await Item.create({
      article1Id: articles[0].id,
      article2Id: articles[1].id,
      article3Id: articles[2].id,
      article4Id: articles[3].id,
    });

    res.status(201).json({ item, articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll({
      order: [["id", "ASC"]],
    });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};