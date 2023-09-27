const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: {
        enum: ["completed", "cancelled"],
      },
    },
    items: {
      type: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
      default: [],
    },
  },

  { timestamps: true }
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
