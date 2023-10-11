const crypto = require("crypto");
const fs = require("fs");

// ----------------------------------------------
function verifySign(x_hmac_tag, response_body, in_signature) {
  const publicKey = Buffer.from(
    fs.readFileSync("./keys/cardbuzz-api.pub", { encoding: "utf-8" })
  );

  let body_text = response_body;
  // let body_text = JSON.stringify(response_body);
  const digest = crypto.createHash("sha256").update(body_text).digest("hex");

  const payload = [x_hmac_tag, digest].join("\n");

  return crypto.verify(
    "sha256",
    Buffer.from(payload),
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
      // padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      // saltLength: crypto.constants.RSA_PSS_SALTLEN_MAX_SIGN,
    },
    Buffer.from(in_signature, "base64")
  );
}

// ----------------------------------------------
function encKey(data) {
  const publicKey = Buffer.from(
    fs.readFileSync("./keys/cardbuzz-api.pub", { encoding: "utf-8" })
  );
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );
  return encryptedData.toString("base64");
}

// ----------------------------------------------
function genRandomKey_b64(size = 32) {
  const key = crypto.randomBytes(size);
  return Buffer.from(key).toString("base64");
}

// ----------------------------------------------
function encPayload(data, secretKey) {
  data = JSON.stringify(data);

  if (typeof secretKey === "undefined") {
    secretKey = genRandomKey_b64(32);
  }
  const key = Buffer.from(secretKey, "base64");

  const iv = crypto.randomBytes(12);

  let cipher = crypto.createCipheriv("chacha20-poly1305", key, iv, {
    authTagLength: 16,
  });
  // const cipherText = cipher.update(data);
  const cipherText = Buffer.concat([
    cipher.update(Buffer.from(data), "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    cipherText: Buffer.concat([iv, cipherText, authTag]).toString("base64"),
    key: key.toString("base64"),
  };
}

// ----------------------------------------------

module.exports = {
  verifySign,
  encKey,
  encPayload,
  genRandomKey_b64,
};
