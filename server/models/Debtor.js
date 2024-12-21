const mongoose = require("mongoose");

const debtorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    creditLimit: {
      type: Number,
    },
    availableCredit: {
      type: Number,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

const Customer = mongoose.model("Debtor", debtorSchema);

module.exports = Customer;
