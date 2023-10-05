const { default: mongoose } = require("mongoose");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

exports.createCart = async (req, res) => {
    const createdCart = await Cart.create({
        owner: req.user.id,
        name: req.body.cartName,
        status: req.body.status,
        items: req.body.products,
    });
    console.log(createdCart);
    res.json({ message: "succesfully created cart" });
};

exports.getCartHistory = async (req, res) => {
    // const cartList = await Cart.find({ owner: req.user.id }).populate(
    //     "items.productId"
    // );

    const cartList = await Cart.find({ owner: req.user.id })
        .populate({
            path: "items.product",
            select: "name category",
        })
        .select("-items._id");

    const groupedItems = cartList.reduce((acc, item) => {
        const createdAt = new Date(item.createdAt);
        const month = createdAt.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });

        if (!acc[month]) {
            acc[month] = [];
        }

        acc[month].push(item);

        return acc;
    }, {});

    // Convert the grouped items object into an array
    const groupedItemsArray = Object.entries(groupedItems).map(
        ([month, items]) => ({
            month,
            items,
        })
    );

    res.json(groupedItemsArray);
};
exports.getSingleCartHistory = async (req, res) => {
    const cartId = req.params.id;
    const cartObjectId = new mongoose.Types.ObjectId(cartId);

    const cart = await Cart.aggregate([
        { $match: { _id: cartObjectId } },
        {
            $lookup: {
                from: "products", // Replace 'products' with the actual name of the Products collection
                localField: "items.product",
                foreignField: "_id",
                as: "productDetail",
            },
        },
        // {
        //     $group: {
        //         _id: null,
        //         items: {
        //             $push: {
        //                 quantity: "$items.product.quantity",
        //                 product: "$items.product",
        //                 name: "$items.name",
        //                 mergedDetail: { $arrayElemAt: ["$productDetail", 0] },
        //             },
        //         },
        //     },
        // },
    ]);

    res.json({
        data: cart,
        message: "Successfully fetched single cart",
    });
};
exports.getTopProduct = async (req, res) => {};

exports.getTopCategory = async (req, res) => {};
