const express = require("express");
const router = express.Router();
const Debtor = require("../../models/Debtor");

// Create debtor
router.post("/", async (req, res) => {
  try {
    const debtor = new Debtor(req.body);
    await debtor.save();
    res.status(201).json(debtor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all debtors
router.get("/", async (req, res) => {
  try {
    const debtors = await Debtor.find().sort({_id: -1});
    res.json(debtors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one debtor
router.get("/:id", async (req, res) => {
  try {
    const debtor = await Debtor.findById(req.params.id);
    if (debtor) {
      res.json(debtor);
    } else {
      res.status(404).json({ message: "Debtor not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update debtor
router.put("/:id", async (req, res) => {
  try {
    const debtor = await Debtor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(debtor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete debtor
router.delete("/:id", async (req, res) => {
  try {
    await Debtor.findByIdAndDelete(req.params.id);
    res.json({ message: "Debtor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
