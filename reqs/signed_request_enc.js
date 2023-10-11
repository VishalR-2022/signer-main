const crypto = require("crypto");
const { httpClient } = require("../httpClient");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");
const { encKey, encPayload } = require("../utils");
// ----------------------------------------------
// ----------------------------------------------

async function encReqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/dummy/dummy1/enc`,
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
async function encReqPost(key, access_token) {
  let body = { website: "cardbuzz.in", ping: "pong" };

  const data = encPayload(body, key);
  const payload = {
    body: data.cipherText,
  };

  const config = {
    method: "post",
    url: `/dummy/dummy1/enc`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: payload,
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
async function encReqPost_pinVerifiable(key, access_token) {
  let body = { website: "cardbuzz.in", ping: "pong" };

  const data = encPayload(body, key);
  const payload = {
    body: data.cipherText,
  };

  const config = {
    method: "post",
    url: `/dummy/dummy1/enc-pin-verifiable`,
    params: {
      b: "c",
      a: [1, 2],
    },
    // body: null,
    data: payload,
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

module.exports = { encReqPost, encReqGet, encReqPost_pinVerifiable };
