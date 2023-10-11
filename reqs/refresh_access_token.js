const { httpClient } = require("../httpClient");
const { encKey, encPayload, genRandomKey_b64 } = require("../utils");

async function refreshAccessToken(refresh_token) {
  const secretkey = genRandomKey_b64(32);
  const key = encKey(secretkey);
  const config = {
    method: "get",
    url: `/user/token/refresh`,
    params: {
      token: key,
    },
    signerSecretKey: secretkey,
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    console.log(e.toString());
    e = !e; // HANDLE error
  }

  return;
}

module.exports = { refreshAccessToken };
