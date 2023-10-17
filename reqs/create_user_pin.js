const crypto = require("crypto");
const { httpClient } = require("../httpClient");
const { encKey, encPayload } = require("../utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

// this needs to be saved securely in keystore/keychain
const SecurePK = {
  priv_key_b64: "",
  peer_pub_key_b64: "",
  shared_secret_key_b64: "",
};

function genSharedSecret() {
  priv_key = crypto.createPrivateKey(
    Buffer.from(SecurePK.priv_key_b64, "base64")
  );
  pub_key = crypto.createPublicKey(
    Buffer.from(SecurePK.peer_pub_key_b64, "base64")
  );
  const shared_key = crypto.diffieHellman({
    publicKey: pub_key,
    privateKey: priv_key,
  });

  const derived_shared_key = crypto.hkdfSync("sha256", shared_key, "", "", 32);
  const derived_shared_key_b64 =
    Buffer.from(derived_shared_key).toString("base64");

  return derived_shared_key_b64;
}

function genX25519KeyPair() {
  const pk = crypto.generateKeyPairSync("x25519");

  // store privKeyPem securely in keystore
  const privKeyPem = pk.privateKey.export({ type: "pkcs8", format: "pem" });

  const pubKeyPem = pk.publicKey.export({ type: "spki", format: "pem" });

  SecurePK.priv_key_b64 = Buffer.from(privKeyPem, "utf-8").toString("base64");

  return Buffer.from(pubKeyPem, "utf8").toString("base64");
}

async function createUserPin(
  { country_code, phone },
  pin,
  access_token,
  recreate_token = null
) {
  pubKeyPem_b64 = genX25519KeyPair();

  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
    pub_key: pubKeyPem_b64,
  };

  const data = encPayload(user);

  const key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };

  // send to sever
  const config = {
    method: "post",
    url: null,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
    headers: {
      // Authorization: `Bearer ${access_token}`,
    },
  };

  if (
    typeof access_token !== "undefined" &&
    access_token !== null &&
    access_token.length > 0
  ) {
    config.url = `/pin/create`;
    config.headers["Authorization"] = `Bearer ${access_token}`;
  } else if (
    typeof recreate_token !== "undefined" &&
    recreate_token !== null &&
    recreate_token.length > 0
  ) {
    config.url = `/pin/recreate/${recreate_token}`;
  }

  let res;
  try {
    res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
    return;
  }

  const peer_pub_key_b64 = res.data.data.ppk;
  SecurePK.peer_pub_key_b64 = peer_pub_key_b64;

  SecurePK.shared_secret_key_b64 = genSharedSecret();

  console.log("shared_secret_key=", SecurePK.shared_secret_key_b64);
}

// ----------------------------------
// ----------------------------------
async function forgotPin({ country_code, phone }) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
  };
  const data = encPayload(user);

  const key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/forgot`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}
// ----------------------------------
// ----------------------------------
async function loginViaPin({ country_code, phone }, pin) {
  let user = {
    country_code: country_code,
    phone: phone,
    device_id: DEVICE_ID,
    pin: pin,
  };
  const data = encPayload(user);

  const key = encKey(data.key);

  const payload = {
    body: data.cipherText,
    token: key,
  };
  // console.log(payload);

  // send to sever
  const config = {
    method: "post",
    url: `/pin/login`,
    params: {},
    // body: null,
    data: payload,
    signerSecretKey: data.key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // HANDLE error
  }
}

module.exports = { createUserPin, forgotPin, loginViaPin };
