const express = require('express');
const app = express();

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: "../.env"});
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");
const bidsRoute = require('./routes/bidsRoute');
const notificationRoute = require('./routes/notificationsRoute');

app.use("/api/users", usersRoute);
app.use("/api/products", productRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontEnd/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontEnd", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Node/express Server is running on port ${port}`));