const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.get("/", eventController.getAllEvents);
router.get("/latest", eventController.getLatestEvent);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);

module.exports = router;
