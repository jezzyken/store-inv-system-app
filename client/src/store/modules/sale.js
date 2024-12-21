/* eslint-disable */

import axios from "axios";

const url = require("@/config").url;

const state = {
  items: [],
  debtorSales: [],
  saleItems: [],
};

const endpoint = "sales";

const actions = {
  async getItem({ commit }, data) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getItemById({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getDebtorSales({ commit }, debtorId) {
    try {
      const response = await axios.get(`${url}/${endpoint}/debtor/${debtorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching debtor sales:", error);
      return error.response;
    }
  },

  async getSaleItems({ commit }, saleId) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${saleId}/items`);
      return response.data;
    } catch (error) {
      console.error("Error fetching sale items:", error);
      return error.response;
    }
  },

  async addItem({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async updateItem({ commit }, data) {
    try {
      const response = await axios.put(`${url}/${endpoint}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deleteItem({ commit }, id) {
    try {
      const response = await axios.delete(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

const mutations = {
  SET_ITEM(state, data) {
    state.items = data;
  },
  SET_DEBTOR_SALES(state, sales) {
    state.debtorSales = sales;
  },
  SET_SALE_ITEMS(state, items) {
    state.saleItems = items;
  },
};

const getters = {
  debtorSales: (state) => state.debtorSales,
  saleItems: (state) => state.saleItems,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
