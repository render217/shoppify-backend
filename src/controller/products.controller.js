const Product = require("../model/product.model");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({
    $or: [{ ownerId: null }],
  });
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const { name, description, image, category } = req.body;
  if (!name || !category) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const productExist = await Product.findOne({ name });
  if (productExist) {
    console.log(productExist);
    return res.status(400).json({ message: "Product already exists" });
  }
  const createdProduct = await Product.create({
    name,
    description,
    image,
    category,
  });
  res.status(201).json({
    statusCode: 201,
    success: true,
    data: createdProduct,
    message: "Successfully created Product",
  });
};

exports.getAllByCategory = async (req, res) => {
  const products = await Product.aggregate([
    { $match: { ownerId: null } },
    {
      $group: {
        _id: "$category",
        categoryName: { $first: "$category" },
        products: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $unwind: "$products", // Unwind the products array
    },
    {
      $sort: { "products.createdAt": 1 }, // Sort by createdAt field in ascending order
    },
    {
      $group: {
        _id: "$_id",
        categoryName: { $first: "$categoryName" },
        products: { $push: "$products" }, // Push the sorted products back into the array
      },
    },
    {
      $project: {
        _id: 0,
        categoryName: 1,
        products: 1,
      },
    },
  ]);
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const prodId = req.params.id;
  const product = await Product.findOne({ _id: prodId });
  res.json({ data: product });
};

exports.getTopCategory = async (req, res) => {};

exports.getTopProduct = async (req, res) => {};
