const crypto = require("crypto");
const { httpClient } = require("../httpClient");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");
const fs = require("fs");
const mime = require("mime");
const axios = require("axios");
const FormData = require("form-data");
// ----------------------------------------------
// ----------------------------------------------

async function plainUploadImage(key, access_token) {
  let body = { website: "cardbuzz.in" };

  const filePath = "/Volumes/LabsHD/dev/cardbuzz/signer/data/dp.jpeg";

  let formData = new FormData();

  formData.append("file", fs.createReadStream(filePath), {
    filename: "dp.jpeg",
    contentType: mime.getType(filePath),
    knownLength: fs.statSync(filePath).size,
  });

  const contentLength = await formData.getLengthSync();

  const config = {
    method: "post",
    url: `/dummy/upload-image`,
    params: {},
    // body: formData1,
    data: formData,
    headers: {
      Authorization: `Bearer ${access_token}`,
      // "Content-Length": formData._overheadLength,
      ...formData.getHeaders(),
      "Content-Length": contentLength,
    },
    signerSecretKey: key,
    skipBodyHash: true,
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
  plainUploadImage,
};
