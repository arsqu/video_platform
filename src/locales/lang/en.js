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
    }
  },
  formList: {
    common: {
      add: '',
      submit: 'Submitted successfully',
      save: '@:formList.common.submit',
      edit: 'Successfully modified',
      p: 'Please enter ',
      r: ' is required',
      v: ' format is invalid'
    },
    gifts: {
      sysKey: {
        label: 'sysKey'
      },
      rate: {
        label: 'rate'
      },
      sysValue: {
        label: 'sysValue'
      },
      sysFirstValue: {
        label: 'sysFirstValue'
      }
    }
  },
  statusCode: {
    5001: 'File upload exception',
    5002: 'File deletion exception',
    5003: 'Email sending abnormal',
    5004: 'The verification code has not expired, please do not send it again!',
    5005: 'The verification code has expired, please obtain it again!',
    5006: 'The account already exists, please log in directly!',
    5007: 'Account is not registered!',
    5008: 'Password is wrong, please re-enter!',
    5009: 'The account is not logged in, please log in to the account first',
    5010: 'token error',
    5011: 'Token has expired, please log in again!',
    5012: 'TOKEN parsing error!',
    5013: 'Insufficient permissions',
    5014: 'Verification code error',
    5015: 'The user does not exist, please confirm that the input is correct!',
    5016: 'This user has not applied for an anchor, please confirm whether it is correct!',
    5017: 'Incorrect account or password'
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
