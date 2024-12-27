/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
  payments: [],
  debtorPayments: []
};

const endpoint = "debtor-payment";

const actions = {
  async getPayments({ commit }) {
    try {
      const response = await axios.get(`${url}/${endpoint}`);
      commit('SET_PAYMENTS', response.data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getPaymentById({ commit }, id) {
    try {
      const response = await axios.get(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async getDebtorPayments({ commit }, debtorId) {
    try {
      const response = await axios.get(`${url}/${endpoint}/debtor/${debtorId}`);
      commit('SET_DEBTOR_PAYMENTS', response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching debtor payments:", error);
      return error.response;
    }
  },

  async addPayment({ commit }, data) {
    try {
      const response = await axios.post(`${url}/${endpoint}`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  },

  async updatePayment({ commit }, data) {
    try {
      const response = await axios.put(`${url}/${endpoint}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

  async deletePayment({ commit }, id) {
    try {
      const response = await axios.delete(`${url}/${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
};

const mutations = {
  SET_PAYMENTS(state, payments) {
    state.payments = payments;
  },
  SET_DEBTOR_PAYMENTS(state, payments) {
    state.debtorPayments = payments;
  }
};

const getters = {
  allPayments: state => state.payments,
  debtorPayments: state => state.debtorPayments
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};