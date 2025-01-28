const express = require('express');
const router = express.Router();
const Sale = require('../../models/Sale');
const SaleItem = require('../../models/SalesItem');
const Product = require('../../models/Product');

router.get('/sales-report', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Start date and end date are required' 
      });
    }

    const dateFilter = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    const sales = await Sale.find(dateFilter)
      .populate('user', 'name')
      .populate('debtor', 'name')
      .lean();

    const saleItems = await SaleItem.find({
      sale: { $in: sales.map(sale => sale._id) }
    })
    .populate({
      path: 'product',
      select: 'name cost price variants type'
    })
    .lean();

    const salesReport = sales.map(sale => {
      const saleProducts = saleItems.filter(item => 
        item.sale.toString() === sale._id.toString()
      );

      let totalCost = 0;
      let totalRevenue = 0;

      saleProducts.forEach(item => {
        const product = item.product;
        let cost = product.cost;
        let price = product.price;
        let variantInfo = null;

        if (product.type === 'Variants' && item.variant) {
          variantInfo = product.variants.find(v => 
            v._id.toString() === item.variant.toString()
          );
          if (variantInfo) {
            cost = variantInfo.cost;
            price = variantInfo.price;
          }
        }

        const subTotal = price * item.quantity;
        totalCost += cost * item.quantity;
        totalRevenue += subTotal;
      });

      const profit = totalRevenue - totalCost;

      return {
        date: sale.date,
        referenceCode: sale.referenceCode,
        customer: sale.customer,
        debtor: sale.debtor?.name,
        paymentType: sale.paymentType,
        paymentStatus: sale.paymentStatus,
        isCredit: sale.isCredit,
        cashier: sale.user?.name || 'Unknown',
        items: saleProducts.map(item => {
          const product = item.product;
          let variantInfo = null;
          let cost = product.cost;
          let price = product.price;
          let variantName = 'Default';

          if (product.type === 'Variants' && item.variant) {
            variantInfo = product.variants.find(v => 
              v._id.toString() === item.variant.toString()
            );
            if (variantInfo) {
              cost = variantInfo.cost;
              price = variantInfo.price;
              variantName = variantInfo.name;
            }
          }

          const subTotal = price * item.quantity;
          const itemProfit = subTotal - (cost * item.quantity);

          return {
            product: product.name,
            variant: variantName,
            quantity: item.quantity,
            cost,
            price,
            subTotal,
            profit: itemProfit
          };
        }),
        discount: sale.discount || 0,
        totalCost,
        totalRevenue,
        profit,
        grandTotal: sale.grandTotal
      };
    });

    const summary = {
      totalSales: sales.length,
      totalRevenue: salesReport.reduce((sum, sale) => sum + sale.totalRevenue, 0),
      totalProfit: salesReport.reduce((sum, sale) => sum + sale.profit, 0),
      totalDiscount: salesReport.reduce((sum, sale) => sum + sale.discount, 0),
      averageProfit: salesReport.length > 0 
        ? salesReport.reduce((sum, sale) => sum + sale.profit, 0) / salesReport.length 
        : 0
    };

    res.json({
      startDate,
      endDate,
      summary,
      sales: salesReport
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      message: 'Error generating sales report',
      error: error.message 
    });
  }
});

// Get product inventory report
router.get('/inventory-report', async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('brand', 'name')
      .populate('unit', 'name')
      .lean();

    const inventoryReport = products.map(product => {


      console.log(product)
      const totalVariantStock = product.variants.reduce((sum, variant) => 
        sum + (variant.stocks || 0), 0
      );

      return {
        name: product.name,
        upc: product.upc,
        category: product.category?.name,
        brand: product.brand?.name,
        unit: product.unit?.name,
        baseStock: product.stocks || 0,
        variantStock: totalVariantStock,
        totalStock: (product.stocks || 0) + totalVariantStock,
        stockAlert: product.stockAlert,
        cost: product.cost,
        price: product.price,
        variants: product.variants
      };
    });

    const summary = {
      totalProducts: products.length,
      totalStock: inventoryReport.reduce((sum, product) => 
        sum + product.totalStock, 0
      ),
      lowStockItems: inventoryReport.filter(product => 
        product.totalStock <= product.stockAlert
      ).length,
      inventoryValue: inventoryReport.reduce((sum, product) => {
        const baseValue = product.baseStock * product.cost;
        const variantValue = product.variants.reduce((vSum, variant) => 
          vSum + (variant.stocks * variant.cost), 0
        );
        return sum + baseValue + variantValue;
      }, 0)
    };

    res.json({
      summary,
      products: inventoryReport
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error generating inventory report',
      error: error.message 
    });
  }
});

// Get top selling products report
router.get('/top-products', async (req, res) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    const dateFilter = startDate && endDate ? {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    } : {};

    const saleItems = await SaleItem.aggregate([
      {
        $lookup: {
          from: 'sales',
          localField: 'sale',
          foreignField: '_id',
          as: 'sale'
        }
      },
      {
        $unwind: '$sale'
      },
      {
        $match: dateFilter
      },
      {
        $group: {
          _id: {
            product: '$product',
            variant: '$variant'
          },
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: '$subTotal' }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: parseInt(limit)
      }
    ]);

    const populatedItems = await Promise.all(
      saleItems.map(async item => {
        const product = await Product.findById(item._id.product)
          .populate('category', 'name')
          .populate('brand', 'name')
          .lean();

        return {
          product: product.name,
          category: product.category?.name,
          brand: product.brand?.name,
          variant: item._id.variant || 'Default',
          totalQuantity: item.totalQuantity,
          totalRevenue: item.totalRevenue
        };
      })
    );

    res.json({
      timeFrame: startDate && endDate ? { startDate, endDate } : 'All time',
      products: populatedItems
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error generating top products report',
      error: error.message 
    });
  }
});

module.exports = router;