const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
  try {
    let { sortBy, order } = req.query;

    if (!sortBy) sortBy = "createdAt";
    if (!order || !["ASC", "DESC"].includes(order.toUpperCase()))
      order = "DESC";

    const events = await Event.findAll({
      order: [[sortBy, order.toUpperCase()]],
      limit: 4,
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLatestEvent = async (req, res) => {
  try {
    const event = await Event.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (!event) {
      return res.status(404).json({ message: "No Events found" });
    }

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
