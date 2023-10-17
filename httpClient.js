const axios = require("axios");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
  JWT_TOKENS,
} = require("./constants");
const { sign } = require("./signer");
const { verifySign } = require("./utils");
// const { getRefreshToken } = require("./reqs/get_refresh_token");

const httpClient = axios.create({
  baseURL: `${AUTH_SVC_ENDPOINT}`,
});

httpClient.interceptors.request.use((config) => {
  if (
    !config.headers["Content-Type"] ||
    typeof config.headers["Content-Type"] === "undefined"
  ) {
    config.headers["Content-Type"] = "application/json";
  }
  // console.log(
  //   ">>>>>>>>>>>>>>>>>>>> config.headers=",
  //   Buffer.byteLength(JSON.stringify(config.data))
  // );

  config.headers["x-date"] = new Date().toISOString().replace(/.\d+Z$/g, "Z");
  config.headers["x-req-id"] = crypto.randomUUID();
  config.headers["x-device-id"] = DEVICE_ID;
  config.headers["Accept"] = "application/json";

  config.params["ts"] = +new Date();

  if ("signerSecretKey" in config && config.signerSecretKey.length > 0) {
    const x_hmac_tag = sign(
      config,
      config.signerSecretKey,
      SIGNED_HEADERS,
      config.baseURL,
      "skipBodyHash" in config ? config.skipBodyHash : false
    );
    config.headers["x-hmac-tag"] = x_hmac_tag;
  }
  return config;
});

httpClient.interceptors.response.use(
  (resp) => {
    // console.log(">>>>>>>>>>>>>>>>>>>> resp.headers=", resp.headers);

    return resp;
  },
  async (error) => {
    const err = error.response;
    // err={err:{code,msg}}
    console.log(err);
    if (err?.code == 20010) {
      // make a call to refresh token
      // await getRefreshToken(JWT_TOKENS.refresh);
      // and then call the original req (for which this token expired err came)
    }

    // Status code outside the range of 2xx
    // handle error cases
    return Promise.reject(error);
  }
);

module.exports = { httpClient };
