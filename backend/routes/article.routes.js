const express = require("express");
const router = express.Router();
const articleController = require("../controllers/article.controller");

router.get("/", articleController.getAllArticles);
router.get("/latest", articleController.getLatestArticle);
router.get("/:id", articleController.getArticleById);
router.post("/", articleController.createArticle);

module.exports = router;
