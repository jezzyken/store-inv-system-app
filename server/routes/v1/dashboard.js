const express = require('express');
const router = express.Router();
const Sale = require('../../models/Sale');
const Product = require('../../models/Product');
const Debtor = require('../../models/Debtor');
const SaleItem = require('../../models/SalesItem');

// Get dashboard summary
router.get('/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todaySales,
      totalProducts,
      lowStockProducts,
      creditSales,
      totalDebtors
    ] = await Promise.all([
      Sale.aggregate([
        { $match: { date: { $gte: today, $lt: tomorrow } } },
        { $group: { _id: null, total: { $sum: "$grandTotal" } } }
      ]),

      Product.countDocuments(),

      Product.aggregate([
        {
          $project: {
            isLowStock: {
              $cond: {
                if: { $lte: ["$stocks", "$stockAlert"] },
                then: 1,
                else: 0
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$isLowStock" }
          }
        }
      ]),

      Sale.aggregate([
        { $match: { isCredit: true } },
        { $group: { _id: null, total: { $sum: "$grandTotal" } } }
      ]),

      Debtor.countDocuments()
    ]);

    res.json({
      todaySales: todaySales[0]?.total || 0,
      totalProducts,
      lowStockProducts: lowStockProducts[0]?.total || 0,
      creditSales: creditSales[0]?.total || 0,
      totalDebtors
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get sales statistics
router.get('/sales-stats', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const salesStats = await Sale.aggregate([
      { $match: { date: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalSales: { $sum: "$grandTotal" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(salesStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top selling products
router.get('/top-products', async (req, res) => {
  try {
    const topProducts = await SaleItem.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$subTotal" }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get credit status summary
router.get('/credit-summary', async (req, res) => {
  try {
    const debtorsSummary = await Debtor.aggregate([
      {
        $group: {
          _id: null,
          totalCreditLimit: { $sum: "$creditLimit" },
          totalAvailableCredit: { $sum: "$availableCredit" },
          averageCreditLimit: { $avg: "$creditLimit" }
        }
      }
    ]);

    const creditSalesByMonth = await Sale.aggregate([
      { $match: { isCredit: true } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$grandTotal" }
        }
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 }
    ]);

    res.json({
      debtorsSummary: debtorsSummary[0] || { totalCreditLimit: 0, totalAvailableCredit: 0, averageCreditLimit: 0 },
      creditSalesByMonth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get inventory status
router.get('/inventory-status', async (req, res) => {
  try {
    const inventoryStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: "$stocks" },
          averagePrice: { $avg: "$price" },
          totalValue: { $sum: { $multiply: ["$stocks", "$cost"] } }
        }
      }
    ]);

    const lowStockItems = await Product.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $ne: ["$stockAlert", null] },
              { $ne: ["$stocks", null] },
              { $lte: [{ $ifNull: ["$stocks", 0] }, { $ifNull: ["$stockAlert", 0] }] }
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          stocks: 1,
          stockAlert: 1
        }
      },
      { $limit: 10 }
    ]);

    res.json({
      inventoryStats: inventoryStats[0] || { totalItems: 0, averagePrice: 0, totalValue: 0 },
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;