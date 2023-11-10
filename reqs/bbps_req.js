const crypto = require("crypto");
const { httpClient } = require("../httpClient_bbps");
const { fetchBillDataDTH, fetchBillDataElectricity } = require("../util_bbps");
const { encKey, encPayload } = require("../utils");

const {
  SIGNED_HEADERS,
  DEVICE_ID,
  BBPS_SVC_ENDPOINT,
} = require("../constants_bbps");

// ----------------------------------------------
// ----------------------------------------------

async function plainReqGet(key, access_token, url) {
  const config = {
    method: "get",
    // url: `/bbps/biller_by_category/Electricity`,
    url: url,
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
    console.log(JSON.stringify(res.data));
  } catch (e) {
    e = !e; // HANDLE error
  }

  return;
}
async function plainReqPost(key, access_token, body) {
//   let body = {
//     "custDetails":{
//        "mobileNo":"7012345102"
//     },
//     "billDetails":{
//        "billerId":"TNEB00000TND01",
//        "customerParams":[
//           {
//              "name":"Consumer Number",
//              "value":"054760011140"
//           }
//        ]
//     }
 //};
    const data = encPayload(body, key);
    const payload = {
        body: data.cipherText,
    };
    const config = {
        method: "post",
        url: `/bbps/fetch`,
        params: {
            ts: +new Date(),
        },
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

async function reqGetBillers(key, access_token, date) {
    const url = `/bbps/biller_by_category/${date}`;
    await plainReqGet(key, access_token, url);
    return;
};

async function reqGetBillersCategories(key, access_token) {
    const url = `/bbps/biller_categories`
    await plainReqGet(key, access_token, url);
    return;
};

async function reqGetBillerUnderCategory(key, access_token, category) {
    const url = `/bbps/biller_by_category/${category}`;
    await plainReqGet(key, access_token, url);
    return;
};

async function reqPostFetchBillDTH(key, access_token) {
    const data = fetchBillDataDTH();
    const url = `/bbps/fetch`
    await plainReqPost(key, access_token, data);
};

async function reqPostFetchBillElectricity(key, access_token) {
    const data = fetchBillDataElectricity();
    const url = `/bbps/fetch`
    await plainReqPost(key, access_token, data);
}

module.exports = {
  plainReqPost,
  plainReqGet,
  reqGetBillers,
  reqGetBillersCategories,
  reqGetBillerUnderCategory,
  reqPostFetchBillDTH,
  reqPostFetchBillElectricity
};
