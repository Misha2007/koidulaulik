const Item = require("../models/Item");
const Article = require("../models/Article");
const { Sequelize } = require("sequelize");

exports.createRandomItem = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: Sequelize.literal("RAND()"),
      limit: 4,
    });

    if (articles.length < 4) return res.status(400).json({ error: "Not enough articles" });

    const item = await Item.create({
      article1Id: articles[0].id,
      article2Id: articles[1].id,
      article3Id: articles[2].id,
      article4Id: articles[3].id,
    });

    res.status(201).json({ item, articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};