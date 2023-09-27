const express = require("express");
const {
  getAllProducts,
  createProduct,
  getAllByCategory,
  getProductById,
} = require("../controller/products.controller");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/category").get(getAllByCategory);
router.route("/:id").get(getProductById);
module.exports = router;
