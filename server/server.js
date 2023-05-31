const express = require('express');
const app = express();

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: "../.env"});
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const productRoute = require("./routes/productsRoute");

app.use("/api/users", usersRoute);
app.use("/api/products", productRoute);

app.listen(port, () => console.log(`Node/express Server is running on port ${port}`));