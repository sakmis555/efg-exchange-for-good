const mongoose = require("mongoose");

const uri = process.env.mongo_url;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongodb connection successful");
});

connection.on("error", (err) => {
  console.log("mongodb connection failed");
});

module.exports = connection;
