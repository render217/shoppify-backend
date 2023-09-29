require("express-async-errors");
require("dotenv").config({ path: "./src/config/.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const productsRoute = require("./src/routes/products.routes");
const connectDB = require("./src/config/database");

app.use(
    cors({
        origin: ["http://localhost:5174", "http://localhost:5173"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/products", productsRoute);
app.use("*", (req, res) => {
    next("route not found");
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Something went wrong" });
});
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
