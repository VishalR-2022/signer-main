const biller_data = { 
    'billerId': 'TRIP00000NAT01', 
    'billerName': 'Triple Play Interactive Network Pvt. Ltd.', 
    'billerAliasName': 'Triple Play', 
    'billerCategoryName': 'Broadband Postpaid', 
    'billerSubCategoryName': '', 
    'billerMode': 'ONLINE', 
    'billerAcceptsAdhoc': 'true', 
    'parentBiller': 'false', 
    'parentBillerId': 'false', 
    'billerCoverage': 'IND', 
    'fetchRequirement': 'OPTIONAL', 
    'paymentAmountExactness': 'Exact', 
    'supportBillValidation': 'NOT_SUPPORTED', 
    'billerEffctvFrom': '2017-05-05', 
    'billerPymtModes': [
        { 
            'paymentMode': 'Internet Banking', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'Debit Card', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'Credit Card', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'Prepaid Card', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'IMPS', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'Cash', 
            'maxLimit': '4999900', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'UPI', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'Wallet', 
            'maxLimit': '', 
            'minLimit': '1' 
        }, { 
            'paymentMode': 'NEFT', 
            'maxLimit': '', 
            'minLimit': '1' 
        }
    ], 
    'billerPymtChnls': [
        { 
            'paymentChannel': 'INT', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'INTB', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'MOB', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'MOBB', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'POS', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'MPOS', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'ATM', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'BNKBRNCH', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'KIOSK', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'AGT', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }, { 
            'paymentChannel': 'BSC', 
            'maxLimit': '5000000', 
            'minLimit': '100' 
        }
    ], 
    'customerParams': [
        { 
            'paramName': 'USER ID', 
            'dataType': 'ALPHANUMERIC', 
            'optional': 'false', 
            'minLength': '', 
            'maxLength': '', 
            'regex': '' 
        }
    ], 
    'reponseParams': [
        { 
            'amtBreakupList': [
                { 
                    'amtBreakup': 'BASE_BILL_AMOUNT' 
                }
            ] 
        }
    ], 
    'additonalInfo': [], 
    'intFeeConf': [
        { 
            'mti': 'PAYMENT', 
            'paymentMode': '', 
            'paymentChannel': '', 
            'responseCode': '000', 
            'feeList': [
                { 
                    'fee': '' 
                }, { 
                    'fee': '' 
                }
            ], 
            'defaultFee': 'true' 
        }, { 
            'mti': 'PAYMENT', 
            'paymentMode': '', 
            'paymentChannel': 'BNKBRNCH', 
            'responseCode': '000', 
            'feeList': [
                { 
                    'fee': '' 
                }, { 
                    'fee': '' 
                }
            ], 
            'defaultFee': 'false' 
        }, { 
            'mti': 'PAYMENT', 
            'paymentMode': '', 
            'paymentChannel': 'AGT', 
            'responseCode': '000', 
            'feeList': [
                { 
                    'fee': '' 
                }, {
                    'fee': '' 
                }
            ], 
            'defaultFee': 'false' 
        }, { 
            'mti': 'PAYMENT', 
            'paymentMode': '', 
            'paymentChannel': 'BSC', 
            'responseCode': '000', 
            'feeList': [
                { 
                    'fee': '' 
                }, { 
                    'fee': '' 
                }
            ], 
            'defaultFee': 'false' 
        }], 'intChngFee': [
            { 
                'feeCode': 'CCF1', 
                'feeDesc': 'Customer_Convenience_Fee', 
                'feeDirection': 'C2B', 
                'feeDetails': [
                    { 
                        'tranAmtRangeMax': '9223372036854775807', 
                        'tranAmtRangeMin': '0', 
                        'percentFee': '0.00', 
                        'flatFee': '0', 
                        'effctvFrom': '2017-05-05', 
                        'effctvTo': '' 
                    }
                ]
            }, { 
                'feeCode': 'PBF', 
                'feeDesc': 'Physical_Biller_Fee', 
                'feeDirection': 'B2C', 
                'feeDetails': [
                    { 
                        'tranAmtRangeMax': '9223372036854775807', 
                        'tranAmtRangeMin': '0', 
                        'percentFee': '0.00', 
                        'flatFee': '500', 
                        'effctvFrom': '2017-05-05', 
                        'effctvTo': '' 
                    }
                ] 
            }, { 
                'feeCode': 'EBF', 
                'feeDesc': 'Electronic_Biller_Fee', 
                'feeDirection': 'B2C', 
                'feeDetails': [
                    { 
                        'tranAmtRangeMax': '9223372036854775807', 
                        'tranAmtRangeMin': '0', 
                        'percentFee': '0.00', 
                        'flatFee': '250', 
                        'effctvFrom': '2017-05-05', 
                        'effctvTo': '' 
                    }
                ] 
            }
        ], 
        'status': 'ACTIVE', 
        'billerResponseType': '' 
    };

function fetchBillDataDTH() {
    const custDetails = {
        "mobileNo":"7012345102",
        "customerName":"Kumar Jayasuriya"
    };
    const billDetails = {
        "billerId": "PAYU70007UPA63",
        "customerParams": [
            {
                "name": "a",
                "value": 1
            }, {
                "name": "a b",
                "value": 12
            }, {
                "name": "a b c",
                "value": 123
            }, {
                "name": "a b c d",
                "value": 222
            }, {
                "name": "a b c d e",
                "value": 225
            }
        ]
    };
    return {
        custDetails,
        billDetails
    };
};


function fetchBillDataElectricity() {
    const custDetails = {
        "mobileNo":"7012345102",
        "customerName":"Kumar Jayasuriya"
    };
    const billDetails = {
        "billDetails":{
            "billerId":"TNEB00000TND01",
            "customerParams":[
               {
                  "name":"Consumer Number",
                  "value":"054760011140"
               }
            ]
         }
    };
    return {
        custDetails,
        billDetails
    };
};


module.exports = {
    fetchBillDataDTH,
    fetchBillDataElectricity
  };