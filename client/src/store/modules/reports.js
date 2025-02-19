/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
  salesReport: [],
  inventoryReport: [],
  topProducts: [],
  salesSummary: null,
  inventorySummary: null,
  debtorReport: [],
  debtorSummary: null,
  debtors: [],
  debtorTransactions: null,
};

const endpoint = "reports";

const actions = {
  // Sales Report Actions
  async getSalesReport({ commit }, dateRange) {
    try {
      const response = await axios.get(`${url}/${endpoint}/sales-report`, {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
      commit("SET_SALES_REPORT", response.data.sales);
      commit("SET_SALES_SUMMARY", response.data.summary);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Inventory Report Actions
  async getInventoryReport({ commit }) {
    try {
      const response = await axios.get(`${url}/${endpoint}/inventory-report`);
      commit("SET_INVENTORY_REPORT", response.data.products);
      commit("SET_INVENTORY_SUMMARY", response.data.summary);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Top Products Report Actions
  async getTopProducts({ commit }, params) {
    try {
      const response = await axios.get(`${url}/${endpoint}/top-products`, {
        params: {
          startDate: params?.startDate,
          endDate: params?.endDate,
          limit: params?.limit || 10,
        },
      });
      commit("SET_TOP_PRODUCTS", response.data.products);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Export Reports
  async exportSalesReport({ commit }, dateRange) {
    try {
      const response = await axios.get(
        `${url}/${endpoint}/sales-report/export`,
        {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async exportInventoryReport({ commit }) {
    try {
      const response = await axios.get(
        `${url}/${endpoint}/inventory-report/export`,
        {
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  // Custom Report Action
  async generateCustomReport({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}/custom`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getDebtorReport({ commit }) {
    try {
      const response = await axios.get(`${url}/${endpoint}/debtor-report`);
      commit("SET_DEBTORS", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getDebtorTransactions({ commit }, debtorId) {
    try {
      const response = await axios.get(
        `${url}/${endpoint}/debtor-transactions/${debtorId}`
      );
      commit("SET_DEBTOR_TRANSACTIONS", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

const mutations = {
  SET_SALES_REPORT(state, data) {
    state.salesReport = data;
  },

  SET_SALES_SUMMARY(state, data) {
    state.salesSummary = data;
  },

  SET_INVENTORY_REPORT(state, data) {
    state.inventoryReport = data;
  },

  SET_INVENTORY_SUMMARY(state, data) {
    state.inventorySummary = data;
  },

  SET_TOP_PRODUCTS(state, data) {
    state.topProducts = data;
  },

  SET_DEBTOR_REPORT(state, data) {
    state.debtorReport = data;
  },

  SET_DEBTOR_SUMMARY(state, data) {
    state.debtorSummary = data;
  },
  SET_DEBTORS(state, data) {
    state.debtors = data;
  },
  SET_DEBTOR_TRANSACTIONS(state, data) {
    state.debtorTransactions = data;
  },
};

const getters = {
  // Sales Report Getters
  totalSales: (state) => {
    return state.salesSummary?.totalSales || 0;
  },
  totalRevenue: (state) => {
    return state.salesSummary?.totalRevenue || 0;
  },
  totalProfit: (state) => {
    return state.salesSummary?.totalProfit || 0;
  },

  // Inventory Report Getters
  totalProducts: (state) => {
    return state.inventorySummary?.totalProducts || 0;
  },
  lowStockProducts: (state) => {
    return state.inventoryReport.filter(
      (product) => product.totalStock <= product.stockAlert
    );
  },
  inventoryValue: (state) => {
    return state.inventorySummary?.inventoryValue || 0;
  },

  // Sale Items by Date
  salesByDate: (state) => {
    return state.salesReport.reduce((acc, sale) => {
      const date = new Date(sale.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sale);
      return acc;
    }, {});
  },

  totalCreditSales: (state) => state.debtorSummary?.totalCreditSales || 0,
  totalPayments: (state) => state.debtorSummary?.totalPayments || 0,
  outstandingBalance: (state) => {
    return (
      (state.debtorSummary?.totalCreditSales || 0) -
      (state.debtorSummary?.totalPayments || 0)
    );
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
