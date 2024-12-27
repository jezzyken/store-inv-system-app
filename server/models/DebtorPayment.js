const mongoose = require("mongoose");

const debtorPaymentSchema = new mongoose.Schema(
  {
    debtor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Debtor",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Gcash"],
      default: "Cash",
    },
    referenceNumber: {
      type: String,
    },
    notes: {
      type: String,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const DebtorPayment = mongoose.model("DebtorPayment", debtorPaymentSchema);

module.exports = DebtorPayment;
