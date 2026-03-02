const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item.controller");

router.post("/next", itemController.createSequentialItem);
router.get("/", itemController.getItems);

module.exports = router;