const Models = require("../../models/Stock");
const StockItemModel = require("../../models/StockItem");
const ProductModel = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "stockitems",
        localField: "_id",
        foreignField: "stock",
        as: "stock",
      },
    },
    {
      $addFields: {
        noOfItems: {
          $size: "$stock",
        },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
  ]);
  return result;
};

const getById = async (id) => {
  console.log('getting stocks')
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "stockitems",
        localField: "_id",
        foreignField: "stock",
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
        status: {
          $first: "$status",
        },
        notes: {
          $first: "$notes",
        },
        date: {
          $first: "$date",
        },
        stockItems: {
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
        _id: -1,
      },
    },
  ]);
  return result;
};

const getStockItems = async (id) => {
  const pipeline = [
    {
      $match: {
        product: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "suppliers",
        localField: "supplier",
        foreignField: "_id",
        as: "supplier",
      },
    },
    {
      $lookup: {
        from: "variants",
        localField: "variant",
        foreignField: "_id",
        as: "variant",
      },
    },
    {
      $unwind: "$supplier",
    },
    {
      $unwind: "$variant",
    },
    {
      $group: {
        _id: {
          product: "$product",
          variant: "$variant._id",
          supplier: "$supplier._id",
        },
        totalQuantity: { $sum: { $toInt: "$quantity" } },
        items: { $push: "$$ROOT" },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { totalQuantity: "$totalQuantity" },
            { $arrayElemAt: ["$items", 0] },
          ],
        },
      },
    },
    {
      $project: {
        items: 0,
      },
    },
  ];
  const result = await Models.aggregate(pipeline);
  return result;
};

const add = async (req) => {
  const { status, notes, stocks } = req.body;


  const stockData = new Models({
    status: status,
    notes: notes,
  });

  const results = await stockData.save();

  for (const stock of stocks) {

    const stockItemEntry = new StockItemModel({
      product: stock.product,
      variant: stock.variant,
      stock: stockData._id,
      quantity: parseInt(stock.quantity, 10),
    });

    await stockItemEntry.save();

    const quantityToAdd = parseInt(stock.quantity, 10);

    if (stock.variant) {
      await ProductModel.updateOne(
        { _id: stock.product, "variants._id": stock.variant },
        {
          $inc: { "variants.$.stocks": quantityToAdd },
        }
      );
    } else {
      await ProductModel.updateOne(
        { _id: stock.product },
        { $inc: { stocks: quantityToAdd } }
      );
    }
  }

  return results;
};


const update = async (id, data) => {
  const { status, notes, stocks, deletedItems, date } = data;

  const stock = await Models.findById(id);
  stock.status = status;
  stock.notes = notes;
  stock.date = date;
  const results = await stock.save();

  if (deletedItems && deletedItems.length > 0) {
    for (const stockItemId of deletedItems) {
      const stockItem = await StockItemModel.findById(stockItemId);
      if (!stockItem) {
        throw new Error(`StockItem with ID ${stockItemId} not found`);
      }

      const previousQuantity = stockItem.quantity;
      const { product, variant } = stockItem;

      await stockItem.deleteOne();

      if (variant) {
        const productVariant = await ProductVariantModel.findById(variant);
        if (productVariant) {
          productVariant.stocks -= previousQuantity;
          await productVariant.save();

          const productDoc = await ProductModel.findById(product);
          if (productDoc) {
            const variants = await ProductVariantModel.find({
              _id: { $in: productDoc.variants },
            });
            productDoc.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
            await productDoc.save();
          }
        }
      } else {
        const productDoc = await ProductModel.findById(product);
        if (productDoc) {
          productDoc.stocks -= previousQuantity;
          await productDoc.save();
        }
      }
    }
  }

  for (const stockData of stocks) {
    const stockItemId = stockData.items_id;
    const quantity = stockData.quantity;
    const supplier = stockData.supplier;

    let stockItem;
    let previousQuantity = 0;
    let currentQuantity = quantity;

    if (stockItemId) {
      stockItem = await StockItemModel.findById(stockItemId);
      if (!stockItem) {
        throw new Error(`StockItem with ID ${stockItemId} not found`);
      }
      previousQuantity = stockItem.quantity;
      stockItem.quantity = quantity;
      stockItem.supplier = supplier;
      await stockItem.save();

      currentQuantity = quantity;
    } else {
      stockItem = new StockItemModel({
        product: stockData.product,
        variant: stockData.variant,
        supplier: stockData.supplier,
        stock: id,
        quantity: stockData.quantity,
      });
      await stockItem.save();
    }

    if (stockData.variant) {
      const variant = await ProductVariantModel.findById(stockData.variant);
      if (variant) {
        let quantityChange = currentQuantity - previousQuantity;

        if (quantityChange < 0) {
          variant.stocks -= Math.abs(quantityChange);
        } else {
          variant.stocks += quantityChange;
        }

        await variant.save();

        const product = await ProductModel.findById(stockData.product);
        if (product) {
          const variants = await ProductVariantModel.find({
            _id: { $in: product.variants },
          });
          product.stocks = variants.reduce((acc, v) => acc + v.stocks, 0);
          await product.save();
        }
      }
    } else {
      const product = await ProductModel.findById(stockData.product);
      if (product) {
        let quantityChange = currentQuantity - previousQuantity;

        if (quantityChange < 0) {
          product.stocks -= Math.abs(quantityChange);
        } else {
          product.stocks += quantityChange;
        }

        await product.save();
      }
    }
  }
  return results;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

const customPopulate = (query) => {
  return query
    .populate({ path: "product", select: "name productCode" })
    .populate({ path: "supplier", select: "name" })
    .populate({ path: "variant" });
};

module.exports = {
  get,
  getById,
  getStockItems,
  remove,
  add,
  update,
};
