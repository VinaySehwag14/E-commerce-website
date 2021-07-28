const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      require: true,
      maxlength: 100,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
      maxlength: 20,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      require: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      Number,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
