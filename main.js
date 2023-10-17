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
  createUserPin,
  forgotPin,
  loginViaPin,
} = require("./reqs/create_user_pin");

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

(async () => {
  const usr_data = {
    country_code: "91",
    phone: "1234567890",
  };

  // on changing device, chk device_id + fcm_reg_token is changed properly in db
  // [createUser] returns access token
  // await createUser(usr_data);
  // return;

  const access_token1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk3NDczNjE0LCJuYmYiOjE2OTc0NzM2MTQsImp0aSI6IjgyZTlmYWUwZjQ1ZWYyNzg5ZmU4YTAyYmZiNDAwNTEzZTNmY2JlMmExMDc0ZDFjNWEwMWNhNGU3YTg0Yjk1MTUiLCJleHAiOjE2OTc0ODgwMTQsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiZmVhNDJmMTctNmQxYS00N2JiLTlmZjktOWRhMjU0ODk0OTlkIiwiYWN0aW9uIjoiVVNFUi1SRUdJU1RFUiJ9LCJwcmUtc2lnbnVwIjp0cnVlfQ.13_MrKjGNv1088gt5UfyUNNVE1F8-XP2wwYfYl-gmh8";

  ///const access_token1 = await createUser(usr_data);

  // [resendOTP] doesnot return any token
  // await resendOTP(usr_data, access_token1);

  // [verifySignupOTP] returns access token
  console.log('~~~~~~~~~~~~~vwerify~~~~~~~~~~~~~~~~')
  //  await verifySignupOTP(usr_data, access_token1, "117123");
  // return;

  // -----------------------------------------------------------------------------------
  const fresh_access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk3NDczNjUwLCJuYmYiOjE2OTc0NzM2NTAsImp0aSI6IjgxMTQ2MTAwZDM2ZjFiY2U0NDYwNGNhNWUwOWQzZDUyNDcyMzNmYWNjMjQyYzE3YjI1YjYxYTc1MjYwNTMzY2UiLCJleHAiOjE2OTc0ODgwNTAsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiMGUxNDkzYjQtNWY2YS00MDg0LWFlM2QtMTliNzE2YWYzODhjIiwiYWN0aW9uIjoiSU5JVC1QSU4ifX0.LZpaCBqNazr_4s3SYC9SJjZCMIWT1FU3zYN9BOytVuE";

  JWT_TOKENS.access = fresh_access_token;

  // [createUserPin] returns access/refresh token and ppk
  // // // pin is neither stored nor logged anywhere in app (neither in-memory nor persistent)
  // await createUserPin(usr_data, "1234", JWT_TOKENS.access);
  // return;

  // -----------------------------------------------------------------------------------
  // [access_token] expires in 15min types...call refreshAccessToken after that
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk3NDczNzEyLCJuYmYiOjE2OTc0NzM3MTIsImp0aSI6IjY4MmM4ODk2NzUzZTA2NDcwZGVjOWZkMGUxMTc4N2E3ZDI1MmNiNzNmY2QwMjkxYzRkYzMzYjI4ZDcwYmU5MTIiLCJleHAiOjE2OTc0ODgxMTIsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.vVwDZwm89boBWXqPFu9QHdVKvtrz_cqwIhZ__RUptEo";
  // [refresh_token] expires in 90days types..call loginViaPin after that
  const refresh_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk3NDczNzEyLCJuYmYiOjE2OTc0NzM3MTIsImp0aSI6ImFkZmRkNWFmZGNlZTA0YWY3M2Y2OTdlM2RkZmJhMGIxNzcyOTc2YTc1Yzc4MWQyYTE4MTRiNTE1ZTY4ZTA5YzAiLCJleHAiOjE3MDUyNDk3MTIsInR5cGUiOiJyZWZyZXNoIn0.lqy5iM9kN0QT49UTE26Y1dWQESeAJlHxCyEKPah8dLo";

  JWT_TOKENS.access = access_token;
  JWT_TOKENS.refresh = refresh_token;

  // // this key is generated in createUserPin.. has to be stored in app keystore/keychain securely
  const secretKey = "5WH/tFHN5Apq9pNdoMSAKEjVmD+g6BBKclojN6Ku+Ak=";

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

  // -------------------------------------- [Agent-svc] ----------------------------------------------------------
  await reqPostForm(secretKey, JWT_TOKENS.access);
  await reqPost(secretKey, JWT_TOKENS.access);
  await reqPutKyc(secretKey, JWT_TOKENS.access);
  await reqGet(secretKey, JWT_TOKENS.access);
  await reqGetQR(secretKey, JWT_TOKENS.access);
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
