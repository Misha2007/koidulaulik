const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  event_date_start: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  event_date_end: {
    type: DataTypes.DATEONLY,
  },
  event_time_start: {
    type: DataTypes.TIME,
  },
  event_time_end: {
    type: DataTypes.TIME,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 8),
  },
  price: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  pubdate: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
  img_url: {
    type: DataTypes.STRING,
  },
});

module.exports = Event;
