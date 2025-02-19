const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
    },
    referenceNo: {
      type: String,
      unique: true
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true
  }
 );
 
 adjustmentSchema.pre('save', async function(next) {
  if (!this.referenceNo) {
    const count = await Adjustment.countDocuments();
    const prefix = 'INV';
    const suffix = String(count + 1).padStart(5, '0');
    this.referenceNo = `${prefix}${suffix}`;
  }
  next();
 });

const Adjustment = mongoose.model("Adjustment", adjustmentSchema);

module.exports = Adjustment;
