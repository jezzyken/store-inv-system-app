const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  upc: {
    type: String,
  },
  name: {
    type: String,
  },
  cost: {
    type: Number,
  },
  price: {
    type: Number,
  },
  stocks: {
    type: Number,
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  upc: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  },
  image: {
    type: String,
  },
  details: {
    type: String,
  },
  type: {
    type: String,
  },
  cost: {
    type: Number,
  },
  price: {
    type: Number,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit', 
  },
  minimumSaleQty: {
    type: Number,
  },
  stockAlert: {
    type: Number,
    default: 0,
  },
  stocks: {
    type: Number,
  },
  variants: [variantSchema], 
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;