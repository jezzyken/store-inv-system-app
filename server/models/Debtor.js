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
    timestamps: true, 
  }
);

debtorSchema.pre('save', function(next) {
  if (this.isNew && !this.availableCredit) {
    this.availableCredit = this.creditLimit;
  }
  next();
});

const Customer = mongoose.model("Debtor", debtorSchema);

module.exports = Customer;