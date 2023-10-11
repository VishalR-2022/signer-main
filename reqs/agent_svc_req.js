const { httpClient } = require("../httpClient");
const { encKey, encPayload } = require("../utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

async function reqGet(key, access_token) {
  const config = {
    method: "get",
    url: `/profile/qr/cash`,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    params: {},
    signerSecretKey: key,
  };

  try {
    let res = await httpClient(config);
    console.log(res.data);
  } catch (e) {
    e = !e; // do nothing with the error
  }

  return;
}

async function reqPost(key, access_token) {
  /**
   * {"partnerReferenceNo":"CARDBUZZ12345","actionName":"ADD_PARTNER_SELLER",
   * "partnerKey":"XXXXXX","p1":"Barber Shop","p2":"Mr Rahul S","p3":"ABC123","p4":"XXXXXXX","p5":"XXXXXXXXX","p6":"1520","p7":"SMALL","p8":"OFFLINE","p9":"PROPRIETARY","p10":"Belgaum","p11":"Belgaum","p12":"29","p13":"591244","p14":"","p15":null,"p16":"000590100021000","p17":"HDFC0000001","p18":"20.23","p19":"70.22","p20":"Kalina","p21":"Santacruz East","p22":"","p23":"","p24":"","p25":"","p26":"19\/11\/1995","p27":"19\/11\/2006","p28":""}
   */
  const p = {
    name: "Mr Rahul S",
    bank_acc_number: "00590110031000",
    bank_acc_ifsc: "HDFC0000001",
    business_name: "Barber Shop",
    turnover: 2000000,
    ownership_type: "PROPRIETARY",
    city: "Belgaum",
    district: "Belgaum",
    state: "Maharashtra",
    pincode: "591244",
    latitude: "25",
    longitude: "76",
    address1: "My Address 11",
    address2: "My address 22",
    dob: (str = "01\/01\/1981"),
  };

  const data = encPayload(p, key);
  const payload = {
    body: data.cipherText,
  };
  const config = {
    method: "post",
    url: `/profile`,
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
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }

  return;
}


async function reqPutKyc(key, access_token) {
  const p = {
    new_settlement_account_number: "000590100032088",
    new_settlement_account_ifsc: "HDFC0000001",
  };
  
  const data = encPayload(p, key);
  const payload = {
    body: data.cipherText,
  };
  const config = {
    method: "put",
    url: `/profile`,
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
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }

  return;
}

module.exports = { reqGet, reqPost, reqPutKyc };
