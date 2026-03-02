const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");

router.post("/", inventoryController.createInventory);
router.get("/user/:userId", inventoryController.getInventoryByUser);

module.exports = router;