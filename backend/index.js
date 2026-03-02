const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const articleRoutes = require("./routes/article.routes");
const eventRoutes = require("./routes/event.routes");

const app = express();
app.use(cors());

app.use(express.json());

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

app.use("/articles", articleRoutes);
app.use("/events", eventRoutes);

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
