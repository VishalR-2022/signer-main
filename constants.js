const SIGNED_HEADERS = ["x-date", "x-req-id", "x-device-id"];

// device_id is uuid created/stored on every app install .. is not physical device id
const DEVICE_ID = "07f42440-ccf6-4e54-b8f1-13ba69700416";

// const AUTH_SVC_ENDPOINT = "http://127.0.0.1:80/api/v1";
const AUTH_SVC_ENDPOINT = "https://auth.svc.steady-rabbit.com/api/v1";

// const WALLET_SVC_ENDPOINT = "http://127.0.0.1:8080";
const WALLET_SVC_ENDPOINT = "https://wallet.svc.steady-rabbit.com";

const JWT_TOKENS = { access_tmp: null, access: null, refresh: null };

module.exports = {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
  WALLET_SVC_ENDPOINT,
  JWT_TOKENS,
};
