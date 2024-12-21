const express = require("express");
const router = express.Router();
const Sale = require("../../models/Sale");
const ObjectId = require("mongoose").Types.ObjectId;

const itemController = require("../../controllers/sale.controller");

router.get("/", itemController.get).post("/", itemController.add);

router
  .get("/:id", itemController.getById)
  .put("/:id", itemController.update)
  .delete("/:id", itemController.remove);

router.get("/debtor/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sales = await Sale.aggregate([
      {
        $match: {
          debtor: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "debtors",
          localField: "debtor",
          foreignField: "_id",
          as: "debtorInfo",
        },
      },
      {
        $unwind: {
          path: "$debtorInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "saleitems",
          localField: "_id",
          foreignField: "sale",
          as: "items",
        },
      },
      {
        $unwind: {
          path: "$items",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          date: { $first: "$date" },
          referenceCode: { $first: "$referenceCode" },
          amountReceived: { $first: "$amountReceived" },
          discount: { $first: "$discount" },
          salesTotal: { $first: "$salesTotal" },
          paymentType: { $first: "$paymentType" },
          change: { $first: "$change" },
          grandTotal: { $first: "$grandTotal" },
          hasDelivery: { $first: "$hasDelivery" },
          customer: { $first: "$customer" },
          notes: { $first: "$notes" },
          isCredit: { $first: "$isCredit" },
          debtor: { $first: "$debtorInfo" },
          items: {
            $push: {
              item_id: "$items._id",
              product: "$productDetails",
              variant: "$items.variant",
              quantity: "$items.quantity",
            },
          },
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
    ]);

    if (!sales.length) {
      return res
        .status(404)
        .json({ message: "No sales found for this debtor" });
    }

    res.status(200).json(sales);
  } catch (error) {
    console.error("Error fetching debtor sales:", error);
    res.status(500).json({
      message: "Error fetching sales data",
      error: error.message,
    });
  }
});

module.exports = router;

router.get("/:id/items", async (req, res) => {
  try {
    const items = await SaleItem.find({ sale: req.params.id }).populate(
      "product"
    );
    res.json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
