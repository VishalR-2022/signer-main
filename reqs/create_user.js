const { httpClient } = require("../httpClient");
const { encKey, encPayload } = require("../utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

async function createUser({ country_code, phone }) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    fcm_reg_token: "xxxx-yyyyy",
    created_at: new Date().toISOString(),
  };
  const data = encPayload(user);

  let key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/user`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
    return res.data.data.access;
  } catch (e) {
    console.log(e);
    e = !e; // HANDLE error
  }
}

async function resendOTP({ country_code, phone }, access_token) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user);
  // console.log(data);
  let key = encKey(data.key);
  // console.log(key);
  const payload = {
    body: data.cipherText,
    token: key,
  };
  console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/otp/resend`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

async function verifySignupOTP({ country_code, phone }, access_token, otp) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
      otp: otp,
    // ts: new Date().toISOString(),
  };
  const data = encPayload(user);

  let key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/otp/verify/register`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

//////////////////// NOT USED ///////////////////////
async function createUserAfterOTPVerified(otp_verified) {
  let user = {
    country_code: "91",
    phone: "1111111111",
    device_id: DEVICE_ID,
    ts: new Date().toISOString(),
    ...otp_verified,
  };
  const data = encPayload(user);

  let key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: `/user/token`,
    params: {},
    // body: null,
    data: payload,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = {
  createUser,
  resendOTP,
  verifySignupOTP,
};
