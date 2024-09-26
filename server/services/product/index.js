const Models = require("../../models/Product");
const ProductVariantModel = require("../../models/ProductVariant");

const ObjectId = require("mongoose").Types.ObjectId;

const get = async () => {
  const result = Models.aggregate([
    ...createLookupStage("categories", "category", "_id", "category", true),
    ...createLookupStage("units", "unit", "_id", "unit", true),
    ...createLookupStage("brands", "brand", "_id", "brand", true),
    {
      $addFields: {
        availableStocks: {
          $cond: {
            if: {
              $eq: ["$type", "Variants"],
            },
            then: {
              $sum: "$variants.stocks",
            },
            else: "$stocks",
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

const getItems = async () => {
  const result = Models.aggregate([
    {
      $addFields: {
        availableStocks: {
          $cond: {
            if: {
              $eq: ["$type", "Variants"],
            },
            then: {
              $sum: "$variants.stocks",
            },
            else: "$stocks",
          },
        },
      },
    },
  ]);

  return result;
};

const getItemPrices = async (id) => {
  const result = await Models.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $unwind: "$prices",
    },
    {
      $lookup: {
        from: "variants",
        localField: "prices.variant",
        foreignField: "_id",
        as: "prices.variant",
      },
    },
    {
      $unwind: "$prices.variant",
    },
    {
      $lookup: {
        from: "units",
        localField: "prices.unit",
        foreignField: "_id",
        as: "prices.unit",
      },
    },
    {
      $unwind: "$prices.unit",
    },
    {
      $lookup: {
        from: "colors",
        localField: "prices.color",
        foreignField: "_id",
        as: "prices.color",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        prices: { $push: "$prices" },
      },
    },
  ]);

  return result;
};

const getById = async (id) => {
  const result = await customPopulate(Models.findById(id));
  console.log(result);
  return result;
};

const add = async (req) => {
  const product = new Models(req.body);
  return await product.save();
};

const update = async (req, id) => {
  const updatedProduct = await Models.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  return updatedProduct;
};

const remove = async (id) => {
  const result = await Models.findByIdAndDelete(id);
  return result;
};

const customPopulate = (query) => {
  return query
    .populate({ path: "brand", select: "name" })
    .populate({ path: "category", select: "name" })
    .populate({ path: "unit", select: "name" });
};

const createLookupStage = (
  from,
  localField,
  foreignField,
  as,
  includeUnwind = false
) => {
  const stages = [
    {
      $lookup: {
        from: from,
        localField: localField,
        foreignField: foreignField,
        as: as,
      },
    },
  ];

  if (includeUnwind) {
    stages.push({
      $unwind: {
        path: `$${as}`,
        preserveNullAndEmptyArrays: true,
      },
    });
  }

  return stages;
};

module.exports = {
  get,
  getById,
  getItems,
  getItemPrices,
  add,
  update,
  remove,
};
