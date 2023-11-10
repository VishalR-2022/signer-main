const crypto = require("crypto");
const {
  plainReqPost,
  plainReqGet,
  plainReqPost_pin_Verifiable,
  plainReqPost_otp_Verifiable,
} = require("./reqs/signed_request_plain");
const {
  encReqPost,
  encReqGet,
  encReqPost_pinVerifiable,
} = require("./reqs/signed_request_enc");
const {
  createUser,
  resendOTP,
  verifySignupOTP,
} = require("./reqs/create_user");
const {
  sendAnyOtherOTP,
  verifyAnyOtherOTP,
  verifyPin,
  resetPin,
  logout,
} = require("./reqs/req_others");

const {
  reqGet,
  reqPost,
  reqPutKyc,
  reqGetQR,
  reqPostForm,
} = require("./reqs/agent_svc_req");

const {
  reqWebhook_Ecol_Validate,
  reqWebhook_Ecol_Notify,
  reqWebhook_SellerAgg_UPI_RESOLUTION,
} = require("./reqs/wallet_svc_req");

const {
  createUserPin,
  forgotPin,
  loginViaPin,
  genX25519KeyPair,
} = require("./reqs/create_user_pin");
const { plainUploadImage } = require("./reqs/upload_image.js");

const {
  reqGetBillers,
  reqGetBillersCategories,
  reqGetBillerUnderCategory
} = require("./reqs/bbps_req")

const { verifySign, encKey } = require("./utils");
const {
  SIGNED_HEADERS,
  DEVICE_ID,
  AUTH_SVC_ENDPOINT,
  JWT_TOKENS,
} = require("./constants");
const { refreshAccessToken } = require("./reqs/refresh_access_token");

// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
// ----------------------------------------------
function genSharedSecret(pk, ppk) {
  priv_key = crypto.createPrivateKey(Buffer.from(pk, "base64"));
  pub_key = crypto.createPublicKey(Buffer.from(ppk, "base64"));
  const shared_key = crypto.diffieHellman({
    publicKey: pub_key,
    privateKey: priv_key,
  });

  const derived_shared_key = crypto.hkdfSync("sha256", shared_key, "", "", 32);
  const derived_shared_key_b64 =
    Buffer.from(derived_shared_key).toString("base64");

  return derived_shared_key_b64;
}
function testSharedSecret(pk, ppk) {
  /*
privKey='MC4CAQAwBQYDK2VuBCIEIBgTnv7ux7Y5L+6GLtk7PD0SVRPoNbITirZ08uKvaGJc'

peer_pub_key='MCowBQYDK2VuAyEAqDPnDbRC+Jfz9JKC1XOJUnUQjvDE3wIj/XBxHrSPH1o='

derived_shared_key='YecdRg/9ZaWdPpd7M0cMtdZZXRlGhix9k1RtYL6oVe8='
*/
  ///////////////////////////////////////////////
  privKey = "MC4CAQAwBQYDK2VuBCIEIAjGYzjHH86pbDKYlPYJAnM8IEXzjoynb07zSC4EB9hS";
  pvk2 = `-----BEGIN PRIVATE KEY-----\n${privKey}\n-----END PRIVATE KEY-----`;
  pvk3 = Buffer.from(pvk2, "utf8").toString("base64");

  pubKey = "MCowBQYDK2VuAyEANBNBi12nqgnk6iOqMx65ZOQ7Hn3qYjGHN8dckeDwd0I=";
  puk2 = `-----BEGIN PUBLIC KEY-----\n${pubKey}\n-----END PUBLIC KEY-----`;
  puk3 = Buffer.from(puk2, "utf8").toString("base64");
  console.log(puk3);

  peerPubKey = "dWfkpxVLfMnmPw73DH1Ugkanc4Rk7bCQy3MbQK1e9HE=";
  // peerPubKey = "MCowBQYDK2VuAyEAvHLfulx/IyQGM78iETPwf6KNovJ6aBdIN1L3l+mY1nE=";
  ppk2 = `-----BEGIN PUBLIC KEY-----\n${peerPubKey}\n-----END PUBLIC KEY-----`;
  ppk3 = Buffer.from(ppk2, "utf8").toString("base64");

  sk = genSharedSecret(pvk3, ppk3);
  console.log(sk);
  return;

  // ss = Buffer.from(pk, "base64").length;
  // console.log(ss);
  // return;

  ppk =
    "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQXZITGZ1bHgvSXlRR003OGlFVFB3ZjZLTm92SjZhQmRJTjFMM2wrbVkxbkU9Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==";
  // "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUNvd0JRWURLMlZ1QXlFQXFEUG5EYlJDK0pmejlKS0MxWE9KVW5VUWp2REUzd0lqL1hCeEhyU1BIMW89Ci0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=";
  // sk = genSharedSecret(pk, ppk);
  // console.log(sk);
  // return;

  pk1 = Buffer.from(ppk, "base64").toString("utf8");
  console.log(pk1);
  return;

  // const pk = genX25519KeyPair();
  // console.log(pk);
  // console.log(ppk2);
  // sk = genSharedSecret(pk, ppk);
  // console.log(sk);

  return;
}

(async () => {
  const usr_data = {
    country_code: "91",
    phone: "1234567890",
  };

  /////////////////////////////////////////////// wallet-svc
  // await reqWebhook_SellerAgg_UPI_RESOLUTION();
  // await reqWebhook_Ecol_Notify();
  // await reqWebhook_Ecol_Validate();
  // return;

  ///////////////////////////////////////////////
  // // on changing device, chk device_id + fcm_reg_token is changed properly in db
  // [createUser] returns access token
  await createUser(usr_data);
  // return;

  const access_token1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk4NjQ5ODI4LCJuYmYiOjE2OTg2NDk4MjgsImp0aSI6ImZiYzA2NDUxNzlmMTAyZmE0MTZhMTkxZjdlZDQwMzUzMTM4NDU2MGFhZDNjYmM3NTkxNGIwNTQwZDRjMDVlMWQiLCJleHAiOjE3MDAxMDk2MjgsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiODFmZjU3MGItYmRkZC00ZjU0LTk5ZGQtYzY1NmQ2MGRmNWE4IiwiYWN0aW9uIjoiVVNFUi1SRUdJU1RFUiJ9LCJwcmUtc2lnbnVwIjp0cnVlfQ.9w3zLRA2JbSy7Cr3vYh0a-chK64tknly8tSdHfd174I";

  // ///////////const access_token1 = await createUser(usr_data);

  // [resendOTP] doesnot return any token
  // await resendOTP(usr_data, access_token1);

  // [verifySignupOTP] returns access token
  // await verifySignupOTP(usr_data, access_token1, "117123");
  // return;

  // -----------------------------------------------------------------------------------
  const fresh_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk4NjQ5ODc1LCJuYmYiOjE2OTg2NDk4NzUsImp0aSI6IjcxYTAwN2Q5NWE5ZTFkOTM2MzQ4MDRmNzI5NTY0NDkzZDZlZDY4ZWYzMGM5YjdkNDA5ZTkxZGYxOTlmNDdhZjQiLCJleHAiOjE3MDAxMDk2NzUsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiYzU3MDU4MGUtODNmYy00MDg2LThjYzEtNTYxZjg2MDU5ZjhkIiwiYWN0aW9uIjoiSU5JVC1QSU4ifX0.0ql4bcLM4doPXw198EqBo8dSADUyDdNZNDCoLT8lsIU";

  JWT_TOKENS.access = fresh_access_token;

  // [createUserPin] returns access/refresh token and ppk
  // // // pin is neither stored nor logged anywhere in app (neither in-memory nor persistent)
  // await createUserPin(usr_data, "1234", JWT_TOKENS.access);
  // return;

  // -----------------------------------------------------------------------------------
  // [access_token] expires in 15min types...call refreshAccessToken after that
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk4NjQ5OTExLCJuYmYiOjE2OTg2NDk5MTEsImp0aSI6ImUyZTY4MmIxODMxNTQyOWJmMmIwOWRmYzEzNTYyOGVhMWJjYzU1MjMxNmJkMTM2ZTE3ZGU0MzdkNjZiZDg5ZDUiLCJleHAiOjE3MDAxMDk3MTEsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.XhpFYOIBNIOsiNDZGPAHOGZO-oAwafy-E0T-ibOh4do";
  // [refresh_token] expires in 90days types..call loginViaPin after that
  const refresh_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk4NjQ5OTExLCJuYmYiOjE2OTg2NDk5MTEsImp0aSI6ImU0MDViZjVkNTI5NGNjMzRjMjY4MDI1ZjVhNWVkZjlkZmJjM2ExMDlmMjNjZmM5ZTVmNTYzNzE1MmRmMTYyYjciLCJleHAiOjE3MDY0NDU3MTEsInR5cGUiOiJyZWZyZXNoIn0.V3IFNR7_5BzDUPlm6Ekx9VyYHEeEeOErc_H2z9EYQ1Y";

  JWT_TOKENS.access = access_token;
  JWT_TOKENS.refresh = refresh_token;

  // // this key is generated in createUserPin.. has to be stored in app keystore/keychain securely
  const secretKey = "LeRySrkCdGW+z+nQeNgZdL71l9AzgDJARld1LXVFkhk=";

  // -----------------------------------------------------------------------------------
  // ***************** [refreshAccessToken] if resp access token expired then call this and then call original req
  // -----------------------------------------------------------------------------------
  // await refreshAccessToken(JWT_TOKENS.refresh);

  // -----------------------------------------------------------------------------------
  // ***************** [sample request for gen otp] called with access token
  // these are not to be used directly
  // any method which needs otp-verification will
  // 1. first internally (behind the screen) call send the otp endpoint.... it will return a [fresh] access token with intent
  // 2. then will display verify-otp screen and send verify-otp with above access token
  // -----------------------------------------------------------------------------------
  let otp_intent = {
    action: "XXX-YYY",
  };
  // otp_intent is generated by some action which requires otp-verification (like create_user above)
  // this returns a [fresh] access token with intent
  // await sendAnyOtherOTP(usr_data, secretKey, JWT_TOKENS.refresh, otp_intent);

  // await resendOTP(usr_data, JWT_TOKENS.access);

  // this is calledw ith access_token returned from sendotp above
  // await verifyAnyOtherOTP(usr_data, secretKey, JWT_TOKENS.access, "117123");

  ////// these ae actual calls made with above returned access token
  // await plainReqPost_otp_Verifiable(secretKey, JWT_TOKENS.access);

  // -----------------------------------------------------------------------------------
  // ***************** [general requests] called with access token
  // -----------------------------------------------------------------------------------
  // await plainReqPost(secretKey, JWT_TOKENS.access);
  // await plainReqGet(secretKey, JWT_TOKENS.access);
  // await encReqPost(secretKey, JWT_TOKENS.access);
  // await encReqGet(secretKey, JWT_TOKENS.access);

  // -----------------------------------------------------------------------------------
  // ***************** [pin verify] start *********************
  // this func will return new access_token
  //    [verifyPin] when refresh_token is valid this can be called (see login via pin for when ref token is expired)

  // have to pass in intent of why I need pin verified
  let intent = {
    action: "EDIT-USER-PROFILE",
  };
  // this returns a [fresh] access token with intent
  // await verifyPin(usr_data, secretKey, JWT_TOKENS.refresh, "1237", intent);

  ////// these ae actual calls made with above returned access token
  // await encReqPost_pinVerifiable(secretKey, JWT_TOKENS.access);
  // await plainReqPost_pin_Verifiable(secretKey, JWT_TOKENS.access);

  // -----------------------------------------------------------------------------------
  // ***************** [pin reset] start *********************
  // this func will return new access_token
  //    [resetPin] to reset pin with ref token
  // -----------------------------------------------------------------------------------
  // await resetPin(usr_data, secretKey, JWT_TOKENS.refresh, "1234", "1235");

  // -----------------------------------------------------------------------------------
  // ***************** [login via pin] start ********************* When refresh token has expired/revoked call this
  // in case
  //    - if refresh token is revoked, like on logout
  //    - if refresh token expires, then cant call verify-pin
  // -----------------------------------------------------------------------------------
  // await loginViaPin(usr_data, "1234");

  // -----------------------------------------------------------------------------------
  // ***************** [forgot-pin] start *********************
  // forgetPin > createUserPin will reset the secretKey also
  // -----------------------------------------------------------------------------------
  // await forgotPin(usr_data);

  // forgot pin will send sms with a url with qs <token>
  // http://127.0.0.1/api/v1/pin/recreate/7m184hwt1895o
  // this is shortcut url to open app actvity to create pin (cant be open directly in browser)
  const recreate_token = "7m184hwt1895o";

  // await createUserPin(usr_data, "1237", null, recreate_token);

  // -----------------------------------------------------------------------------------
  // ***************** [logout] start ********************* revokes both access and refresh tokens
  // await logout(secretKey, JWT_TOKENS.access);

  // -----------------------------------------------------------------------------------
  // ***************** [upload image] called with access token
  // -----------------------------------------------------------------------------------
  // await plainUploadImage(secretKey, JWT_TOKENS.access);

  // -------------------------------------- [Agent-svc] ----------------------------------------------------------
  // await reqPostForm(secretKey, JWT_TOKENS.access);
  // await reqPost(secretKey, JWT_TOKENS.access);
  // await reqPutKyc(secretKey, JWT_TOKENS.access);
  // await reqGet(secretKey, JWT_TOKENS.access);
  // await reqGetQR(secretKey, JWT_TOKENS.access);


  // -------------------------------------- [BBPS-svc] ----------------------------------------------------------
  const date = "2023-09-01";   /* Keep this date greater than or equal to "2023-09-01" */
  // await reqGetBillers(secretKey, JWT_TOKENS.access, date);
  categories = {1: "Broadband Postpaid", 2: "DTH", 3:"Mobile Postpaid", 4: "Electricity",
                              5: "Fastag", 6: "Gas"};
  // await reqGetBillersCategories(secretKey, JWT_TOKENS.access);
  const category = require('querystring').escape(categories[6]);
  // await reqGetBillerUnderCategory(secretKey, JWT_TOKENS.access, category);
  // await reqPostFetchBill(secretKey, JWT_TOKENS.access, data)
})();

/*
// forgotPin

<intent-filter>
  <action android:name="android.intent.action.VIEW"></action>
  <category android:name="android.intent.category.DEFAULT"></category>
  <category android:name="android.intent.category.BROWSABLE"></category>
  <data
    android:scheme="http"
    android:host="cardbuzz.in"
    android:pathPrefix="api/v1/pin/rereate">
  </data>
</intent-filter>
http://www.cardbuzz.in/api/v1/pin/rereate/<recreate_token>

Uri data = getIntent().getData();
strScreenName = data.toString()
        .replaceAll("com.some_thing.profile://", "")
        .replaceAll("@", "");
*/
