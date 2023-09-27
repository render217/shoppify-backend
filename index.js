require("express-async-errors");
require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const app = express();
const productsRoute = require("./src/routes/products.routes");
const connectDB = require("./src/config/database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRoute);

const port = process.env.PORT || 3500;
const start = async () => {
  try {
    await connectDB();
    app.listen(port, (req, res) => {
      console.log(`server is on ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
