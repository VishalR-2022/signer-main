const crypto = require("crypto");
const { httpClient } = require("../httpClient");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

async function plainReqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/dummy/dummy1`,
    params: {
      b: "c",
      a: [2, 1],
    },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
async function plainReqPost(key, access_token) {
  let body = { website: "cardbuzz.in" };

  const config = {
    method: "post",
    url: `/dummy/dummy1`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: body,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
async function plainReqPost_pin_Verifiable(key, access_token) {
  let body = { website: "cardbuzz.in" };

  const config = {
    method: "post",
    url: `/dummy/dummy1/plain-pin-verifiable`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: body,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
async function plainReqPost_otp_Verifiable(key, access_token) {
  let body = { website: "cardbuzz.in" };

  const config = {
    method: "post",
    url: `/dummy/dummy1/plain-otp-verifiable`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: body,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}

module.exports = {
  plainReqPost,
  plainReqGet,
  plainReqPost_pin_Verifiable,
  plainReqPost_otp_Verifiable,
};
