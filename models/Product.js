const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStocks: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
