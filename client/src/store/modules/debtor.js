/* eslint-disable */
import axios from "axios";

const url = require("@/config").url;

const state = {
 debtors: [],
 currentDebtor: null
}; 

const endpoint = "debtors";

const actions = {
 // Get all debtors
 async getDebtors({ commit }) {
   try {
     const response = await axios.get(`${url}/${endpoint}`);
     commit('SET_DEBTORS', response.data);
     return response.data;
   } catch (error) {
     return error.response;
   }
 },

 // Get single debtor
 async getDebtor({ commit }, id) {
   try {
     const response = await axios.get(`${url}/${endpoint}/${id}`);
     commit('SET_CURRENT_DEBTOR', response.data);
     return response.data;
   } catch (error) {
     return error.response; 
   }
 },

 // Create new debtor
 async addDebtor({ commit }, data) {
   try {
     const response = await axios.post(`${url}/${endpoint}`, data);
     return response.data;
   } catch (error) {
     return error.response;
   }
 },

 // Update debtor
 async updateDebtor({ commit }, data) {
   try {
     const response = await axios.put(`${url}/${endpoint}/${data._id}`, data);
     return response.data;
   } catch (error) {
     return error.response;
   }
 },

 // Delete debtor
 async deleteDebtor({ commit }, id) {
   try {
     const response = await axios.delete(`${url}/${endpoint}/${id}`);
     return response.data;
   } catch (error) {
     return error.response;
   }
 }
};

const mutations = {
 SET_DEBTORS(state, debtors) {
   state.debtors = debtors;
 },
 SET_CURRENT_DEBTOR(state, debtor) {
   state.currentDebtor = debtor;
 }
};

const getters = {
 allDebtors: state => state.debtors,
 currentDebtor: state => state.currentDebtor
};

export default {
 namespaced: true,
 state,
 actions, 
 mutations,
 getters
};