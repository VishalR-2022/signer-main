const { httpClientWeb } = require("../httpClientWebhook");
const { encKey, encPayload } = require("../utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
  WALLET_SVC_ENDPOINT,
} = require("../constants");

// ----------------------------------------------
// ----------------------------------------------

// # https://wallet.svc.steady-rabbit.com/api/v1/webhook/ybl-callback/selleragg-api
// # https://wallet.svc.steady-rabbit.com/api/v1/webhook/ybl-callback/upi-api
// # https://wallet.svc.steady-rabbit.com/api/v1/webhook/ybl-callback/domestic-payment-api
// # https://wallet.svc.steady-rabbit.com/api/v1/webhook/ybl-callback/e-collect-api

async function reqWebhook_Ecol_Validate() {
  // l
  const payload = {
    validate: {
      customer_code: "CARDBZ",
      bene_account_no: "CARDBZ76235230",
      bene_account_ifsc: "YESB0CMSNOC",
      bene_full_name: "reds",
      transfer_type: "NEFT",
      transfer_unique_no: "7346tyeghd",
      transfer_timestamp: "2018-03-27 17:29:17",
      transfer_ccy: "INR",
      transfer_amt: 43.0,
      rmtr_account_no: "87654356789",
      rmtr_account_ifsc: "hdfc0123456",
      rmtr_account_type: "ca",
      rmtr_full_name: "refd",
      rmtr_address: "refdx",
      rmtr_to_bene_note: "pass",
      attempt_no: 1,
    },
  };
  const config = {
    method: "post",
    // url: `/api/v1/pulse`,
    url: `/api/v1/webhook/ybl-callback/e-collect-api/validate`,
    params: {
      ts: +new Date(),
    },
    data: payload,
  };

  try {
    let res = await httpClientWeb(config);
    console.log(res.data);
  } catch (e) {
    console.log(e);
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }

  return;
}

async function reqWebhook_Ecol_Notify() {
  const payload = {
    notify: {
      customer_code: "CARDBZ",
      bene_account_no: "CARDBZ76235230",
      bene_account_ifsc: "YESB0CMSNOC",
      bene_full_name: "reds",
      transfer_type: "NEFT",
      transfer_unique_no: "7346tyeghd",
      transfer_timestamp: "2018-03-27 17:29:17",
      transfer_ccy: "INR",
      transfer_amt: 43.0,
      rmtr_account_no: "87654356789",
      rmtr_account_ifsc: "hdfc0123456",
      rmtr_account_type: "ca",
      rmtr_full_name: "refd",
      rmtr_to_bene_note: "pass",
      attempt_no: 1,
      status: "CREDITED",
      credit_acct_no: "765433456789",
      credited_at: "2017-07-27 11:48:02",
    },
  };

  const config = {
    method: "post",
    // url: `/api/v1/pulse`,
    url: `/api/v1/webhook/ybl-callback/e-collect-api/notify`,
    params: {
      ts: +new Date(),
    },
    data: payload,
  };

  try {
    let res = await httpClientWeb(config);
    console.log(res.data);
  } catch (e) {
    console.log(e);
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }

  return;
}
async function reqWebhook_SellerAgg_UPI_RESOLUTION() {
  const hash =
    "c4wzjVZt54aEaGmcgoz8hfggP7/P51TP0YRV7K1i3vKS1dEor3g7TB4OO7wxX/idhhfOSqzcqwVAM8OJWFQ5ztErmLbg3ayZcKYCI68Rs07v4ftwsPd/rhsXBTeJ5H4Bp/xEPszy7vfbvUv4G+01pcLZtfjM5BGxM4rh0ZS30NtFRA10VIDfP/UGYtDcasLYmz1i6iwb9Nwwy3pvr5Oiyy6clm9dErZSbTdqPBrZYRAfF2vFCQhkL39wWrDrdKg/9vnHfxGCOFz2thftrSusvEKjF3Dk9FiitnBwJjBdK2OEoREgMOWEJSvdLIZfvhmQOKB0PS8H4lhApyLgQpUekQ==";
  const key =
    "cbYvQjZ3hULHo2Ubz+USqVOPqKNxieg2fbwyC+jn34giONf/PFB48ZWvJEf3X0wAcGyrtPdx76nafDjEeLVZHOb20wCkq/PWs8Iu4Osz+OA7JP/dMSwYYd9jgsHXGImY3inGkP4S+uvaG0zlx3/Hlt5ORVVnJof/IdbHeOxdBsufndiAmA/YIxqM0F81aR5UjcT/LfrCDJ4aZrnTeAasSDBXxtO38D9EZbIPpaIafsBxC6BlMYvfuO5s1Bl4TQctPYWo0d5meOJMMFseUaoL4yJ07cRqENJpc5Ky8WoqA65tM82zw476WJ2pIv/j2WmsHkQVMdc5aJRVT5I0jUNSSQ==";
  const iv = "1572740531589614";
  const callback_type =
    "fubFbXIjpgldwzeDVlSj5SSHvARlhEVNHrv21boqvWy+EH0rZ9d7EzUXHOSnaxXXZFasiiAfJZeoA3yCO1GzM7q70rWjWjlqSauEW3ckCMtxj+lz1TbJEDXg3YtMiY+XZlSe0fXmKMakKe1D/gVMrdp0r0Ce5Unto8/2Y8MScxldd/kl6MmpmifVuYwsJm+lH83GVV/Ud3IhWd+vVSywm2ufzcD+kh4fy6Oa35NuhGhv3UO+o+O8++uGd3whDKNkKazIA6hUMBAQBH3gYXWNIu5O4Nzfaqy8U9hmOYY275lTHbgLI0uUXZ3/LytO/oSZ5eyz4Skxx4RBimkID6pacg==";

  const body =
    "t8Sn4TkP5U3p82NN/Wb41qwV0zPVnN4e5mOxeVZHxfNdr7ClT4IAQ9QZfob4+FnMw8Q0CdBA7qpFsUZRDhmnzqGUy95XGkqyFf7g0hFSPgS2Dr5NTKnF+7Ig97h+9TDy3p3e3CKCJmpVCdJFw2RF8EcTVJfMlPvpPORUvkUiW33BxNLOOdg0rvR80c8b4A1nL4LgrwR80ohnMZTLVuo8F7baLTVGwb/jv57//hkjxNYZaliTXSgto6CFlwLTQtmk9U9V0hFHVwBIY7iWhlm6nP29WA9QteyknMcxUkowernYhih5Se7Cgw3rzDYFTLh0f0pSD+c4X9+PfbnWjKm23uJObmwOseUuQaAVa6CuD4YVbY2Pu0i668NZurprs/pTL7z3BuyJeYaqfhqMW0fVq+dzJKTgWdO5rCynGYzGEbEvhennfnIcsI1Gufuv+cey7NTssppzckyFQ5uHfzGMw6AEbCZ822S5SXaVm3iID7Z09i8HEJfA9LNoEwzHp4CEgBuY7/eEPryDlV6Qq9rIJaY1pBjiJU8Q9rLR8nJA+QKQrDBW18XeQHfqAUnwbtUED8phlv42Jq3fcpS2pc5RuzPFa9Z7Zh3Kcz9QuhtOkXQMNwqACAEcMDpjPBW/Psw1d9/2OHaJtnMTf7aQRG8cGg==";

  const payload = {
    body: body,
  };

  const config = {
    method: "post",
    // url: `/api/v1/pulse`,
    url: `/api/v1/webhook/ybl-callback/selleragg-api`,
    // url: `/api/v1/webhook/ybl-callback/e-collect-api`,
    params: {
      ts: +new Date(),
    },
    data: payload,
    headers: {
      hash: hash,
      key: key,
      iv: iv,
      callbackType: callback_type,
    },
  };

  try {
    let res = await httpClientWeb(config);
    console.log(res.data);
  } catch (e) {
    console.log(e);
    e = !e; // do nothing with the error
    console.log({ status: "FAIL" });
  }

  return;
}

module.exports = {
  reqWebhook_Ecol_Validate,
  reqWebhook_Ecol_Notify,
  reqWebhook_SellerAgg_UPI_RESOLUTION,
};
