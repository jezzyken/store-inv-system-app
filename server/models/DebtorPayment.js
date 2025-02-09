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
      unique: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

debtorPaymentSchema.pre("save", async function (next) {
  if (!this.referenceNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    });

    const sequence = String(count + 1).padStart(4, "0");

    this.referenceNumber = `PAY-${year}${month}${day}-${sequence}`;
  }
  next();
});

const DebtorPayment = mongoose.model("DebtorPayment", debtorPaymentSchema);

module.exports = DebtorPayment;
