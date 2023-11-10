const SIGNED_HEADERS = ["x-date", "x-req-id", "x-device-id"];

// device_id is uuid created/stored on every app install .. is not physical device id
const DEVICE_ID = "07f42440-ccf6-4e54-b8f1-13ba69700416";

const BBPS_SVC_ENDPOINT = "http://127.0.0.1:90/api/v1";

module.exports = {
  SIGNED_HEADERS,
  DEVICE_ID,
  BBPS_SVC_ENDPOINT: BBPS_SVC_ENDPOINT,
};
