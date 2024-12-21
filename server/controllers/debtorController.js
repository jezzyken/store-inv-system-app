const Debtor = require('../models/Debtor');
const Sale = require('../models/Sale');

const get = async () => {
  const result = await Debtor.find().sort({ _id: -1 });
  return result;
};

const getById = async (id) => {
  const result = await Debtor.findById(id);
  return result;
};

const add = async (req) => {
  const debtor = new Debtor(req.body);
  const savedDebtor = await debtor.save();
  return savedDebtor;
};

const update = async (id, data) => {
  const result = await Debtor.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const remove = async (id) => {
  const result = await Debtor.findByIdAndDelete(id);
  return result;
};

const getDebtorSales = async (id) => {
  const sales = await Sale.find({ debtor: id })
    .sort({ createdAt: -1 })
    .select('date salesTotal paymentType referenceNo');
  return sales;
};

const getDebtorCredit = async (id) => {
  const debtor = await Debtor.findById(id);
  const creditSales = await Sale.find({ 
    debtor: id,
    paymentType: 'Credit'
  }).select('salesTotal');
  
  const usedCredit = creditSales.reduce((total, sale) => total + sale.salesTotal, 0);
  const availableCredit = debtor.creditLimit - usedCredit;
  
  return {
    creditLimit: debtor.creditLimit,
    usedCredit,
    availableCredit
  };
};

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  getDebtorSales,
  getDebtorCredit
};