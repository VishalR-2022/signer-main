const axios = require("axios");
const { WALLET_SVC_ENDPOINT } = require("./constants");

const httpClientWeb = axios.create({
  baseURL: `${WALLET_SVC_ENDPOINT}`,
});

httpClientWeb.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";

  return config;
});

httpClientWeb.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async (error) => {
    const err = error.response?.data?.detail?.err;
    console.log(err);
    return Promise.reject(error);
  }
);

module.exports = { httpClientWeb };
