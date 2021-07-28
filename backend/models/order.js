const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const orderScehma = new Schema(
  {
    products: [ProductCartSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    status: {
      type: String,
      default: "Recieved",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderScehma);

module.exports = { Order, ProductCart };
