/* eslint-disable */
import axios from "axios";
const url = require("@/config").url;

const state = {};

const endpoint = "uploads";

const actions = {
  async uploadFile({ commit }, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${url}/${endpoint}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
