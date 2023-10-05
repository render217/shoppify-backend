const express = require("express");
const {
    createCart,
    getCartHistory,
    getSingleCartHistory,
} = require("../controller/carts.controller");
const router = express.Router();

router.route("/").get(getCartHistory);
router.route("/").post(createCart);
router.route("/:id").get(getSingleCartHistory);
module.exports = router;
