const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory.controller");
const verifyToken = require("../middlewares/authJwt.js");

router.post("/", inventoryController.createInventory);
router.get("/user", verifyToken, inventoryController.getInventoryByUser);

module.exports = router;
