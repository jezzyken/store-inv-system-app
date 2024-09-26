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

const Variant = mongoose.model("Variant", variantSchema);

module.exports = Variant;
