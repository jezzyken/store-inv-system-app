/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
  summary: {
    todaySales: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    creditSales: 0,
    totalDebtors: 0
  },
  salesStats: [],
  topProducts: [],
  creditSummary: {
    debtorsSummary: {
      totalCreditLimit: 0,
      totalAvailableCredit: 0,
      averageCreditLimit: 0
    },
    creditSalesByMonth: []
  },
  inventoryStatus: {
    inventoryStats: {
      totalItems: 0,
      averagePrice: 0,
      totalValue: 0
    },
    lowStockItems: []
  },
  loading: false,
  error: null,
  selectedPeriod: 'month'
};

const endpoint = "dashboard";

const actions = {
  async getDashboardSummary({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${url}/${endpoint}/summary`);
      if (response.data) {
        commit('SET_SUMMARY', response.data);
        return response.data;
      }
      throw new Error('No data received');
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch summary');
      return error.response;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async getSalesStats({ commit }, period = 'month') {
    try {
      commit('SET_LOADING', true);
      commit('SET_PERIOD', period);
      const response = await axios.get(`${url}/${endpoint}/sales-stats`, {
        params: { period }
      });
      if (response.data) {
        commit('SET_SALES_STATS', response.data);
        return response.data;
      }
      throw new Error('No sales stats received');
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch sales stats');
      return error.response;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async getTopProducts({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${url}/${endpoint}/top-products`);
      if (response.data) {
        commit('SET_TOP_PRODUCTS', response.data);
        return response.data;
      }
      throw new Error('No top products data received');
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch top products');
      return error.response;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async getCreditSummary({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${url}/${endpoint}/credit-summary`);
      if (response.data) {
        commit('SET_CREDIT_SUMMARY', response.data);
        return response.data;
      }
      throw new Error('No credit summary received');
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch credit summary');
      return error.response;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async getInventoryStatus({ commit }) {
    try {
      commit('SET_LOADING', true);
      const response = await axios.get(`${url}/${endpoint}/inventory-status`);
      if (response.data) {
        commit('SET_INVENTORY_STATUS', response.data);
        return response.data;
      }
      throw new Error('No inventory status received');
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch inventory status');
      return error.response;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async fetchAllDashboardData({ dispatch, commit }) {
    try {
      commit('SET_LOADING', true);
      await Promise.all([
        dispatch('getDashboardSummary'),
        dispatch('getSalesStats'),
        dispatch('getTopProducts'),
        dispatch('getCreditSummary'),
        dispatch('getInventoryStatus')
      ]);
    } catch (error) {
      commit('SET_ERROR', error.message || 'Failed to fetch dashboard data');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  clearError({ commit }) {
    commit('SET_ERROR', null);
  }
};

const mutations = {
  SET_SUMMARY(state, data) {
    state.summary = data || state.summary;
  },

  SET_SALES_STATS(state, data) {
    state.salesStats = data || [];
  },

  SET_TOP_PRODUCTS(state, data) {
    state.topProducts = data || [];
  },

  SET_CREDIT_SUMMARY(state, data) {
    state.creditSummary = data || state.creditSummary;
  },

  SET_INVENTORY_STATUS(state, data) {
    state.inventoryStatus = data || state.inventoryStatus;
  },

  SET_LOADING(state, status) {
    state.loading = status;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  SET_PERIOD(state, period) {
    state.selectedPeriod = period;
  }
};

const getters = {
  getSummary: state => state.summary,
  getSalesStats: state => state.salesStats,
  getTopProducts: state => state.topProducts,
  getCreditSummary: state => state.creditSummary,
  getInventoryStatus: state => state.inventoryStatus,
  isLoading: state => state.loading,
  getError: state => state.error,
  getSelectedPeriod: state => state.selectedPeriod,
  
  // Computed getters
  getTotalSalesValue: state => {
    return state.salesStats.reduce((total, day) => total + (day.totalSales || 0), 0);
  },
  
  getLowStockItemsCount: state => {
    return state.inventoryStatus.lowStockItems?.length || 0;
  },
  
  getCreditUtilization: state => {
    const { totalCreditLimit = 0, totalAvailableCredit = 0 } = state.creditSummary.debtorsSummary || {};
    return totalCreditLimit ? Math.round(((totalCreditLimit - totalAvailableCredit) / totalCreditLimit) * 100) : 0;
  },

  getFormattedSalesStats: state => {
    return state.salesStats.map(stat => ({
      ...stat,
      formattedDate: new Date(stat._id).toLocaleDateString(),
      formattedSales: new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
      }).format(stat.totalSales)
    }));
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};