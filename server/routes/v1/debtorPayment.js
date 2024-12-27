const express = require("express");
const router = express.Router();
const DebtorPayment = require("../../models/DebtorPayment");
const Debtor = require("../../models/Debtor");

router.post("/", async (req, res) => {
  try {
    const payment = new DebtorPayment(req.body);
    const savedPayment = await payment.save();

    const debtor = await Debtor.findById(payment.debtor);
    debtor.availableCredit += payment.amount;
    await debtor.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const payments = await DebtorPayment.find().populate("debtor");
    // .populate("user");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payment = await DebtorPayment.findById(req.params.id).populate(
      "debtor"
    );
    // .populate("user");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/debtor/:debtorId", async (req, res) => {
  try {
    const payments = await DebtorPayment.find({ debtor: req.params.debtorId })
      .populate("debtor")
      // .populate("user")
      .sort({ date: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payment = await DebtorPayment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payment = await DebtorPayment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
