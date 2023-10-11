const { httpClient } = require("../httpClient");
const { encKey, encPayload } = require("../utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT: API_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

async function sendAnyOtherOTP(
  { country_code, phone },
  secretKey,
  access_token,
  intent
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    intent_req_action: intent.action,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/otp/send`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}
async function verifyAnyOtherOTP(
  { country_code, phone },
  secretKey,
  access_token,
  otp
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    otp: otp,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/verify`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

async function verifyPin(
  { country_code, phone },
  secretKey,
  access_token,
  pin,
  intent
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
    // intent_req_token: intent.token,
    intent_req_action: intent.action,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/verify`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

async function resetPin(
  { country_code, phone },
  secretKey,
  access_token,
  old_pin,
  new_pin
) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: old_pin,
    new_pin: new_pin,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user, secretKey);

  const payload = {
    body: data.cipherText,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/reset`,
    params: {},
    // body: null,
    data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

async function logout(secretKey, access_token) {
  // send to sever
  const config = {
    method: "delete",
    url: `/user/token/logout`,
    params: {},
    // body: null,
    // data: payload,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: secretKey,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = {
  sendAnyOtherOTP,
  verifyAnyOtherOTP,
  verifyPin,
  resetPin,
  logout,
};
