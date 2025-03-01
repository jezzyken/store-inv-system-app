const Models = require("../../models/Sale");
const SalesItemModel = require("../../models/SalesItem");
const ProductModel = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");
const DeliveryModel = require("../../models/Delivery");
const DebtorModel = require("../../models/Debtor");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = await Models.aggregate([
    {
      $lookup: {
        from: "saleitems",
        localField: "_id",
        foreignField: "sale",
        as: "sale",
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
      $addFields: {
        noOfItems: {
          $size: "$sale",
        },
        debtorName: "$debtorInfo.name",
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
  console.log("getting sales item", id);
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
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
      $unwind: {
        path: "$variantDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        date: {
          $first: "$date",
        },
        amountReceived: {
          $first: "$referenceCode",
        },
        amountReceived: {
          $first: "$amountReceived",
        },
        discount: {
          $first: "$discount",
        },
        salesTotal: {
          $first: "$salesTotal",
        },
        paymentType: {
          $first: "$paymentType",
        },
        change: {
          $first: "$change",
        },
        grandTotal: {
          $first: "$grandTotal",
        },
        hasDelivery: {
          $first: "$hasDelivery",
        },
        customer: {
          $first: "$customer",
        },
        notes: {
          $first: "$notes",
        },
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
        _id: -1,
      },
    },
  ]);

  console.log(result)
  return result;
};

const getByDebtor = async (debtorId) => {
  const result = await Models.aggregate([
    {
      $match: {
        debtor: new ObjectId(debtorId),
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
      $sort: {
        date: -1,
      },
    },
  ]);
  return result;
};

const add = async (req) => {
  const { items, paymentType, debtorId } = req.body;
  const sale = new Models(req.body);

  if (paymentType === "Credit" && debtorId) {
    sale.debtor = debtorId;
    sale.isCredit = true;
    
    await updateDebtorCredit(debtorId, parseFloat(sale.salesTotal));
  }

  const savedSale = await sale.save();

  for (const itemData of items) {
    const saleItem = new SalesItemModel({
      product: itemData.product,
      variant: itemData.variant,
      sale: savedSale._id,
      quantity: itemData.quantity,
      price: itemData.price,
    });
    await saleItem.save();

    const quantityToSub = parseInt(itemData.quantity, 10);

    if (itemData.variant) {
      await ProductModel.updateOne(
        { _id: itemData.product, "variants._id": itemData.variant },
        { $inc: { "variants.$.stocks": -quantityToSub } }
      );
    } else {
      await ProductModel.updateOne(
        { _id: itemData.product },
        { $inc: { stocks: -quantityToSub } }
      );
    }
  }

  return savedSale;
};





const update = async (id, data) => {
  const {
    date,
    amountReceived,
    discount,
    salesTotal,
    paymentType,
    change,
    grandTotal,
    notes,
    stocks,
    customer,
    deletedItems,
    hasDelivery,
    delivery,
  } = data;

  const sale = await Models.findById(id);

  sale.date = date;
  sale.amountReceived = amountReceived;
  sale.discount = discount;
  sale.salesTotal = salesTotal;
  sale.paymentType = paymentType;
  sale.change = change;
  sale.grandTotal = grandTotal;
  sale.notes = notes;
  sale.customer = customer;

  const results = await sale.save();

  if (deletedItems && deletedItems.length > 0) {
    for (const itemId of deletedItems) {
      const saleItem = await SalesItemModel.findById(itemId);
      if (saleItem) {
        const previousQuantity = saleItem.quantity;

        if (saleItem.variant) {
          const variant = await ProductVariantModel.findById(saleItem.variant);
          if (variant) {
            variant.stocks += previousQuantity;
            await variant.save();
          }
        } else {
          const product = await ProductModel.findById(saleItem.product);
          if (product) {
            product.stocks += previousQuantity;
            await product.save();
          }
        }

        await SalesItemModel.findByIdAndDelete(itemId);
      }
    }
  }

  for (const stockData of stocks) {
    const stockItemId = stockData.items_id;
    const quantity = stockData.quantity;
    const subTotal = stockData.subTotal;

    let stockItem;
    let previousQuantity = 0;
    let currentQuantity = quantity;

    if (stockItemId) {
      stockItem = await SalesItemModel.findById(stockItemId);
      if (!stockItem) {
        throw new Error(`StockItem with ID ${stockItemId} not found`);
      }
      previousQuantity = stockItem.quantity;
      stockItem.quantity = quantity;
      stockItem.subTotal = subTotal;
      await stockItem.save();

      currentQuantity = quantity;
    } else {
      stockItem = new SalesItemModel({
        product: stockData.product,
        variant: stockData.variant,
        sale: id,
        quantity: stockData.quantity,
        subTotal: stockData.subTotal,
      });
      await stockItem.save();
    }

    if (previousQuantity !== currentQuantity) {
      const quantityChange = currentQuantity - previousQuantity;

      if (stockData.variant) {
        const variant = await ProductVariantModel.findById(stockData.variant);
        if (variant) {
          if (quantityChange > 0) {
            variant.stocks -= Math.abs(quantityChange);
          } else {
            variant.stocks += Math.abs(quantityChange);
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
          if (quantityChange > 0) {
            product.stocks -= Math.abs(quantityChange);
          } else {
            product.stocks += Math.abs(quantityChange);
          }
          await product.save();
        }
      }
    }
  }

  if (hasDelivery) {
    let deliveryRecord = await DeliveryModel.findOne({ sale: id });
    if (!deliveryRecord) {
      deliveryRecord = new DeliveryModel({
        sale: id,
        ...delivery,
      });
    } else {
      deliveryRecord.recipientName = delivery.recipientName;
      deliveryRecord.contactNo = delivery.contactNo;
      deliveryRecord.address = delivery.address;
      deliveryRecord.notes = delivery.notes;
      deliveryRecord.deliveryDate = delivery.deliveryDate;
      deliveryRecord.deliveryFee = delivery.deliveryFee;
      deliveryRecord.status = delivery.status;
    }
    await deliveryRecord.save();
  }
  return results;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

const updateDebtorCredit = async (debtorId, amount) => {
  try {
    const debtor = await DebtorModel.findById(debtorId);
    if (!debtor) {
      throw new Error('Debtor not found');
    }

    const newAvailableCredit = debtor.availableCredit - amount;

    await DebtorModel.findByIdAndUpdate(
      debtorId,
      { $set: { availableCredit: newAvailableCredit } },
      { new: true }
    );

    return true;
  } catch (error) {
    throw new Error(`Failed to update debtor credit: ${error.message}`);
  }
};

module.exports = {
  get,
  getById,
  getByDebtor,
  remove,
  add,
  update,
};
