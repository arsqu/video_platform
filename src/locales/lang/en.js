export default {
  common: {
    income: 'Income',
    info: 'Detail',
    revenue: 'Revenue',
    customer: 'Customer',
    originOrder: 'origin Order',
    construction: 'The page is under construction...'
  },
  btnGroup: {
    confirm: 'Confirm',
    submit: 'Submit',
    upd: 'modify',
    del: 'Delete',
    upload: 'Upload',
    login: 'Login',
    signin: 'Log in',
    detl: 'Detail',
    signup: 'Sign up',
    add: 'Add',
    withdrawal: 'Apply for withdrawal',
    export: 'Export'
  },
  database: {
    currency: 'currency',
    appName: 'App Name'
  },
  components: {
    result: {
      app: 'Application Pending review',
      btnTxt: 'backHome'
    }
  },
  userHead: {
    logout: 'Log Out',
    navTool: ['Account Info', 'Company Info']
  },
  // account: {
  //   signtxt: 'Sign up',
  //   logtxt: 'Log in',
  //   logOutTxt: 'Log out'
  // },
  account: {
    wel_text: 'Hello',
    navbar: [
      'Index',
      'Transactions',
      'Settlement',
      'Withdrawal',
      'Summary',
      'Document'
    ],
    card: {
      apply: {
        head: 'Apply Products',
        content: 'Accept online or in-app payments anytime'
      },
      record: {
        head: 'Transactions',
        content: 'Keep abreast of income and expenses. You can view recent transactions here.'
      },
      withdrawal: {
        head: 'withdrawal',
        content: 'Accept App balance withdrawal'
      }
    },
    headList: {
      product: 'Online list',
      approval: 'Pending list'
    }
  },
  signup: {
    signtxt: 'Sign up',
    form: {
      email: {
        label: 'Email',
        placeholder: 'Please enter the email address',
        tips: {
          req: 'Email is required',
          err: 'Email format is invalid'
        }
      },
      account: {
        label: 'Account',
        placeholder: 'Please enter the Account',
        tips: {
          req: 'Account is required',
          err: 'Account format is invalid'
        }
      },
      sendCode: 'Send Code',
      code: {
        label: 'Verification Code',
        placeholder: 'Please enter the verification code',
        tips: {
          req: 'Verification code is required',
          err: ''
        }
      },
      pwd: {
        label: 'Password',
        placeholder: 'Please enter the password',
        tips: {
          descTxt: 'Password rule',
          desc: 'Password Rules:<br> - Password length 6-20 characters<br/> - Numbers,upper and lower case letters allowed<br/> - Special characters allowed:~`!@#$%^&#38;*()_-+={}[]|;:,&lt;&gt;.?/' + '<br/> - No more than four consecutive numbers and letters<br/> - Can\'t be all numbers or letters<br/>',
          req: 'Password is required',
          err: 'Password format is incorrect'
        }
      },
      rPwd: {
        label: 'Confirm Password',
        placeholder: 'Please enter the password again',
        tips: {
          req: 'Confirm password is required',
          err: 'The two passwords do not match'
        }
      },
      btnTxt: 'Confirm',
      notice: 'I have read and agree to the terms of <a href="javascript:;">agreement</a>'
    },
    tips: {
      sendCode: 'The email has been sent, please wait',
      regsuccess: 'registration success'
    }
  },
  login: {
    logintxt: 'login',
    form: {
      email: {
        label: 'Email',
        placeholder: 'Email address',
        tips: {
          req: 'Please enter a valid email address',
          err: 'Email format is invalid'
        }
      },
      identity: {
        label: 'account or email',
        placeholder: 'please enter email or account',
        tips: {
          req: 'please enter email or account',
          err: ''
        }
      },
      account: {
        label: 'Account',
        placeholder: 'Please enter the Account',
        tips: {
          req: 'Account is required',
          err: 'Email format is incorrect'
        }
      },
      pwd: {
        label: 'Password',
        placeholder: '@:login.form.pwd.label',
        tips: {
          descTxt: 'Password rule',
          req: 'Please enter your password'
        }
      },
      btnTxt: 'Confirm',
      notice: '<a href="javascript:;">Forgot login password?</a>'
    },
    tips: {
      logsuccess: 'login success'
    }
  },
  tableList: {
    header: {
      operation: 'operation'
    },
    appTable: {
      appName: '@:database.appName',
      result: 'Approval Status',
      appType: 'App Type',
      appNo: 'App No',
      appTyp: 'App Type',
      signKey: 'Sign Key',
      syncUrl: 'Sync Url',
      countryList: 'Target Country',
      ipList: 'ip whitelist',
      createTime: 'creation Time',
      appContent: 'App desc',
      appCate: 'App Category',
      ad: 'creation Time'
    },
    recordTable: {
      searchForm: {
        searchType: 'Transaction Type',
        str: '@:tableList.recordTable.appNo',
        currency: '@:database.currency',
        orderNo: 'order No',
        payStatus: 'payment status',
        payoutsStatus: 'payout status',
        startTime: 'start Time',
        endTime: 'end Time'
      },
      mchCallbackUrl: 'Merch Callback Url',
      datestr: 'bank card',
      payoutsStatus: 'payout status',
      appNo: 'app No',
      appName: '@:database.appName',
      channelName: 'channel name',
      title: 'pay Ability',
      orderNo: 'order No',
      currency: '@:database.currency',
      mchOrderNo: 'Merch Order No',
      mchParam: 'Merch Param',
      custId: 'Cust Id',
      mchCustId: 'Merch Cust Id',
      amount: 'Trans amount',
      mchBackUrl: 'Merch backUrl',
      ad: 'creation Time',
      outAd: 'Spending time',
      payAd: 'creation Time',
      payStatus: 'payment status',
      syncStatus: 'Sync status',
      custPhone: 'Cust phone',
      custMail: 'Cust mail',
      custAccount: 'Cust Account',
      custIfcs: 'Cust Ifcs',
      custVpa: 'Cust Vpa',
      handFee: 'handling fee',
      ptmPaymentmode: 'paymentmode',
      handFeeRate: 'handling Fee Rate'
    },
    settleTable: {
      searchForm: {
        str: 'App No',
        appName: '@:database.appName',
        currency: '@:database.currency',
        orderNo: '@:tableList.recordTable.orderNo',
        payStatus: '@:tableList.recordTable.payStatus',
        payAd: '@:tableList.settleTable.payAd',
        ad: '@:tableList.settleTable.ad',
        startTime: 'start Time',
        endTime: 'end Time'
      },
      appName: '@:database.appName',
      appNo: '@:tableList.recordTable.appNo',
      orderNo: 'order No',
      currency: '@:database.currency',
      amount: 'Trans amount',
      setAmount: 'Settlement amount',
      headFee: 'handling fee',
      handFee: 'handling fee',
      headFeeRate: 'handing Fee Rate',
      exchangeRate: 'ExRate',
      payAd: 'Order date',
      payoutAd: '@:tableList.settleTable.ad',
      ad: 'Settlement date'
    },
    rateTable: {
      insummary: 'Revenue summary',
      outsummary: 'Expenditure summary',
      appNo: '@:tableList.recordTable.appNo',
      currency: '@:database.currency',
      amount: 'payment Amount',
      handFee: 'handling fee',
      totalAmount: 'Amount received',
      totalSetAmount: 'Settlement amount',
      beAd: 'start Time',
      edAd: 'end Time',
      ad: 'warehousing time'
    },
    withdrawalTable: {
      searchForm: {
        currency: '@:database.currency',
        str: '@:tableList.recordTable.appNo',
        carryStatus: 'Withdrawal status',
        startTime: 'start Time',
        endTime: 'end Time'
      },
      currency: '@:database.currency',
      amount: 'Withdrawal amount',
      appNo: '@:tableList.recordTable.appNo',
      appName: '@:database.appName',
      merchantName: 'Withdrawer',
      carryStatus: 'Withdrawal status',
      ad: 'application date'
    },
    balanceWithdrawal: {
      searchForm: {
        currency: '@:database.currency',
        str: '@:tableList.recordTable.appNo'
      },
      currency: '@:database.currency',
      appNo: '@:tableList.recordTable.appNo',
      amount: 'Withdrawable balance',
      ad: 'application date'
    }
  },
  formList: {
    step: {
      0: 'Company Information',
      1: 'Apply Application',
      2: 'Information Review',
      3: 'success',
      4: 'Merchant Information'
    },
    common: {
      add: '',
      submit: 'Submitted successfully',
      save: '@:formList.common.submit',
      edit: 'Successfully modified',
      p: 'Please enter ',
      r: ' is required',
      v: ' format is invalid'
    },
    accInfo: {
      account: {
        label: 'account',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      email: {
        label: 'Email',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      pwd: {
        label: 'Password',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      merchant: {
        label: 'merchant name',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      userPhone: {
        label: 'Phone No',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      }
    },
    comInfo: {
      companyName: {
        label: 'Business Name',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      regAddress: {
        label: 'Business Address',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      phone: {
        label: 'Phone No',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      createTime: {
        label: 'Establishment Date',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      allotedTime: {
        label: 'Operation period',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      businessScope: {
        label: 'Business Scope',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankInfo: {
        label: 'Name of Beneficiary Bank',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankAddress: {
        label: 'bank Address',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankNum: {
        label: 'bank Account',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankCode: {
        label: 'SWIFT Code',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      businessLicense: {
        label: 'Business License',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      contract: {
        label: 'contract',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      idCard: 'Id Card',
      cardFront: {
        label: 'card Front',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      cardBack: {
        label: 'card Back',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      tips: {
        image: 'Support extensions: jpg, jpeg, png, webp'
      }
    },
    applyApp: {
      appName: {
        label: 'Application Name',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appNo: {
        label: 'Application No',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appTyp: {
        label: 'Application Type',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appAddress: {
        label: 'Online Store Website/ APP Download Address',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appContent: {
        label: 'Application description',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appCate: {
        label: 'Business Category',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      signKey: {
        label: 'Sign Key',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      syncUrl: {
        label: 'Sync Url',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      countryList: {
        label: 'Target Country',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      ipList: {
        label: 'ip whitelist',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      ad: {
        label: 'creation Time',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      tips: {
        submit: 'Submitted successfully, waiting for review'
      }
    },
    balanceWithdrawal: {
      amount: {
        label: 'Withdrawal Amount',
        placeholder: '',
        tips: {
          req: '',
          err: 'only whole amount can be entered'
        }
      },
      appNo: {
        label: '@:tableList.recordTable.appNo',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      currency: {
        label: '@:database.currency',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      }
    }
  },
  statusCode: {
    4010: 'This mailbox is already registered, please log in directly!',
    4011: 'The system is abnormal, please contact the administrator!',
    4012: 'Verification code has not expired, please do not get it again',
    4013: 'Email input error or verification code has expired, please check carefully',
    4014: 'Two passwords are inconsistent, please re-enter',
    4015: 'Verification code error',
    4016: 'Token error',
    4017: 'Account is not registered',
    4018: 'Account or password is wrong',
    4019: 'Account is not logged in, please log in first',
    4020: 'token invalid',
    4021: 'File upload failed',
    4022: 'File upload failed',
    4023: 'File key error',
    4024: 'The application was not queried, please confirm whether the input is correct',
    4025: 'Mail sending is abnormal, please check the email address is correct!',
    4026: 'Excel export is abnormal! ',
    4027: 'Failed to modify company information',
    4028: 'This account is not available!',
    4029: "You don't have this application, you can't modify it",
    4030: 'No Data',
    4031: 'No content, export prohibited!',
    4032: 'Unreviewed apps cannot be modified',
    4033: 'Successful review, does not support modification',
    4034: 'The information was submitted successfully and cannot be submitted repeatedly',
    4035: 'cannot be modified during review',
    4036: 'Insufficient balance, not withdrawable',
    4037: 'Cannot withdraw cash, please confirm whether it is correct'
  },
  errCode: 'Server Error',
  mapConfig: {
    account: {
      appTyp: {
        1: 'App',
        2: 'Web',
        3: 'Mobile site'
      },
      result: {
        1: 'pending',
        2: 'faild',
        3: 'passed'
      }
    },
    record: {
      payStatus: {
        0: 'pending',
        1: 'successful',
        2: 'failed'
      },
      payoutsStatus: {
        0: 'pending',
        1: 'successful',
        2: 'failed'
      },
      syncStatus: {
        '-1': 'No feedback',
        0: 'pending',
        1: 'success',
        2: 'failed'
      },
      searchType: {
        0: 'income',
        1: 'expense'
      }
    },
    withdrawal: {
      carryStatus: {
        1: 'pending',
        2: 'passed',
        3: 'refuse'
      }
    }
  }
}
