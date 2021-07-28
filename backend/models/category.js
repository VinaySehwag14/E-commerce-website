const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
      maxlength: 30,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
