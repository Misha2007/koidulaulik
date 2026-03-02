const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

router.get("/", itemController.getItems);
router.post("/random", itemController.createRandomItem);

module.exports = router;