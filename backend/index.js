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

app.get('/proxy-image', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing URL");

  try {
    // Use native fetch in Node 18+
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://kultuuriaken.tartu.ee/',
      },
    });

    if (!response.ok) {
      return res.status(response.status).send(`Failed to fetch image: ${response.status}`);
    }

    // Convert arrayBuffer to Buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.set('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.send(buffer);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Server error fetching image");
  }
});



app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});
