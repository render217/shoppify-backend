const express = require("express");
const {
  getAllProducts,
  createProduct,
  getAllByCategory,
} = require("../controller/products.controller");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/category").get(getAllByCategory);

module.exports = router;
