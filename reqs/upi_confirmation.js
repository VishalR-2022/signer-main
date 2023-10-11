async function reqPostWebhook(key, access_token) {
    const p = {
        "gatewayResponseStatus": "SUCCESS/FAIL/REJECT",
        "amount": 10, 
        "gatewayReferenceId": "220610079682", 
        "gatewayTransactionId": "YESBE49B0A1A26F84C0FE05400144FF8FE4",
        "rejectReason": "Partner is not active",
        "payeeVPA": "jptest.kshs110213@yestransact", 
        "payerName": "ABSL ENTERPRISE",
        "gatewayResponseCode": "", 
        "payerVPA": "7208865023@yesb", 
        "type": "MERCHANT_CREDITED_VIA_PAY", 
        "merchantRequestId": "YES61A23E2C911D4C09966E46F847F", 
        "transactionTimestamp": "2022-07-25T11:11:11",
        "gatewayeResponseMessage": "" };
  
    const config = {
      method: "post",
      url: `/webhook/callback`,
      params: {},
      data: p,
      headers: {
      },
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
  
  module.exports = { reqPostWebhook };