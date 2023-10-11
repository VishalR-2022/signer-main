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

const { reqGet, reqPost } = require("./reqs/agent_svc_req");
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

  // // on changing device, chk device_id + fcm_reg_token is changed properly in db
  // [createUser] returns access token
   
  // await createUser(usr_data);
  // return;

  const access_token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk2OTYxMTIxLCJuYmYiOjE2OTY5NjExMjEsImp0aSI6IjFmODQxMDk2ZmI1ZGY0NzY0YTQ2YzJmYmM1N2FhNmI0NjlkOGIxZTE2ODJjYmFhZjU4ZTVhNjVlOGNkY2Q4ODkiLCJleHAiOjE2OTY5NzU1MjEsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiZDBhYmI0YTQtOWNjOC00MDQzLWEyMGMtMzdiMzQxYjViNTJhIiwiYWN0aW9uIjoiVVNFUi1SRUdJU1RFUiJ9LCJwcmUtc2lnbnVwIjp0cnVlfQ.Uanx5daPDQcXM--xdkTU0ffjacaOBuIOLA9aXKeBJgs'
    // const access_token1 = await createUser(usr_data);

  // [resendOTP] doesnot return any token
  
  // await resendOTP(usr_data, access_token1);

  // [verifySignupOTP] returns access token
  // await verifySignupOTP(usr_data, access_token1, "117123");
  // return;

  // -----------------------------------------------------------------------------------
  const fresh_access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk2OTYxMTQ5LCJuYmYiOjE2OTY5NjExNDksImp0aSI6IjFmMDU3ZTM0ZWJiNDM4ODZkOGRlYjVhZWJhNTc3Y2FiMmIyYTM4ZGFiYTM4NzIwOWM0NjVkMTYxNTYwNzY0M2QiLCJleHAiOjE2OTY5NzU1NDksInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiNjAwMDliMTgtMzZjZS00YTVjLWEzZWQtMGNmZjJiM2YxZDE4IiwiYWN0aW9uIjoiSU5JVC1QSU4ifX0.Oyt1ymEx5PcQVlyIVK1wDwlN7sPqnAt08bedPhC9-wo'
  JWT_TOKENS.access = fresh_access_token;

  // [createUserPin] returns access/refresh token and ppk
  // pin is neither stored nor logged anywhere in app (neither in-memory nor persistent)
  // await createUserPin(usr_data, JWT_TOKENS.access, "1234");
  // createUserPin,
  // -----------------------------------------------------------------------------------
  // [access_token] expires in 15min types...call refreshAccessToken after that
  const access_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk2OTYxMjg4LCJuYmYiOjE2OTY5NjEyODgsImp0aSI6ImY4YjNjNzhiNjk1MjQ1OWU3YThlYmVlYzU4NDU5NTQxNzRhMDcxMWQzMmRiMGVjZDhiYWIwNmQ4YjQwMDk5ZjciLCJleHAiOjE2OTY5NzU2ODgsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZX0.WNjsSWmqdsbdfz5zK5HUhR64mE7Z2IWkhgsf6P4IB6Q";
  // [refresh_token] expires in 90days types..call loginViaPin after that
  const refresh_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk2OTYxMjg4LCJuYmYiOjE2OTY5NjEyODgsImp0aSI6IjMwNTNmZmY0YmQ5ZjUwYWY2NDcxMTNkM2E2MmI0NGE0NjQ0MTMwNzFkYjdjOWVhZjM5ZDg3M2IwZmIxMzIwYzkiLCJleHAiOjE3MDQ3MzcyODgsInR5cGUiOiJyZWZyZXNoIn0.aeS10mVCfEFVmrRBaA4ni5_W-aVZ6Gu38uNcZZLFwdw";

  JWT_TOKENS.access = access_token;
  JWT_TOKENS.refresh = refresh_token;

  // this key is generated in createUserPin.. has to be stored in app keystore/keychain securely
  const secretKey = "gUf/VGe9gsHRB2h5p6kGQSikJyKXpsRAfJtgAKr4g3s==";

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

  // these ae actual calls made with above returned access token
  // await plainReqPost_otp_Verifiable(secretKey, JWT_TOKENS.access);

  // -----------------------------------------------------------------------------------
  // ***************** [general requests] called with access token
  // // -----------------------------------------------------------------------------------
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
  await verifyPin(usr_data, secretKey, JWT_TOKENS.refresh, "1234", intent);

  // these ae actual calls made with above returned access token
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
   await loginViaPin(usr_data, "1234");

  // -----------------------------------------------------------------------------------
  // ***************** [forgot-pin] start *********************
  // forgetPin > createUserPin will reset the secretKey also
  // -----------------------------------------------------------------------------------
  // await forgotPin(usr_data);

  // forgot pin will send sms with a url with qs <token>
  // http://127.0.0.1/v1/pin/forgot-create?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk0OTU2NTgxLCJuYmYiOjE2OTQ5NTY1ODEsImp0aSI6IjlkNGRmYTUyZjVhYTYzYWFhYzY3ZjMzYmM3NDg3ZDNlMDBkOTdhZGJhNjUxZjM4N2U5Nzg5MDA2MjRhOWFiYzEiLCJleHAiOjE2OTUwNjYzODEsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.3w-fXph0z5-pwp7XG7DAg98-E4fyB0k05mC062WrKCo
  // this is shortcut url to open app actvity to create pin (cant be open directly in browser)
  const tmp_access_token2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTEyMzQ1Njc4OTBAMDdmNDI0NDAtY2NmNi00ZTU0LWI4ZjEtMTNiYTY5NzAwNDE2IiwiaWF0IjoxNjk2MTYwOTM3LCJuYmYiOjE2OTYxNjA5MzcsImp0aSI6ImY4NDY4NjkzYzI5ZTNhYTA1MzZiZDVlMDgxOTY1NjZmNDY0OWU4NTQ5ZDFiYmIwYTlmNDBjMTc5NDQ5ZmI4YWEiLCJleHAiOjE2OTYxOTUxMzcsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6dHJ1ZSwiaW50ZW50Ijp7InRva2VuIjoiNzcyMzBkOTgtOTg2Mi00OGFjLWI5YjMtYTVlMDVlNTRlMjY1IiwiYWN0aW9uIjoiRk9SR09ULVBJTiJ9fQ.Som66i4oeFsILTuDxZUcRZ0NNLOj8FZal_aZDzSSEBc";

  // await createUserPin(usr_data, tmp_access_token2, "1237");

  // -----------------------------------------------------------------------------------
  // ***************** [logout] start ********************* revokes both access and refresh tokens
  // await logout(secretKey, JWT_TOKENS.access);
})();
