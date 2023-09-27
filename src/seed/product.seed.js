const faker = require("@faker-js/faker").faker;
const { default: mongoose } = require("mongoose");
const Product = require("../model/product.model");
const fs = require("fs");

const data = fs.readFileSync("product.json", "utf-8");

const seedProducts = async () => {
    try {
        const productsExist = await Product.find();
        if (productsExist) {
            await Product.deleteMany();
        }
        const products = await Product.insertMany(JSON.parse(data));
        console.log(products);
    } catch (error) {
        console.log(error)
    }
};

const connectDB = async () => {
    try {
        const con = await mongoose.connect(
            "mongodb://127.0.0.1:27017/shoppify"
        );
        console.log("successfully connected");
        return con;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB().then(async () => {
   await seedProducts();
}).catch(err=>console.log(err))
