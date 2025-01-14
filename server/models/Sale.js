const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    referenceCode: {
      type: String,
    },
    amountReceived: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    salesTotal: {
      type: Number,
    },
    paymentType: {
      type: String,
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "paid",
    },
    change: {
      type: Number,
    },
    grandTotal: {
      type: Number,
    },
    isCredit: {
      type: Boolean,
      default: false,
    },
    customer: {
      type: String,
      default: "Walk-in",
    },
    debtor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Debtor",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

saleSchema.pre("save", function (next) {
  if (!this.isNew) {
    return next();
  }

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let referenceCode = "";
  for (let i = 0; i < length; i++) {
    referenceCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  this.referenceCode = referenceCode;

  next();
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
