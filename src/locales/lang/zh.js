export default {
  common: {
    income: '收入',
    revenue: '代付',
    info: '详情',
    customer: '客户',
    originOrder: '交易订单',
    construction: '功能正在建设中...'
  },
  btnGroup: {
    confirm: '确认',
    submit: '提交',
    upd: '修改',
    del: '删除',
    upload: '提交',
    login: '登录',
    signin: '登录',
    signup: '注册',
    detl: '详情',
    withdrawal: '申请提现',
    add: '新增',
    export: '导出'
  },
  database: {
    currency: '货币',
    appName: '应用名'
  },
  components: {
    result: {
      app: '应用正在审核中',
      btnTxt: '返回'
    }
  },
  userHead: {
    logout: '退出',
    navTool: ['账户信息', '公司信息']
  },
  account: {
    wel_text: '您好',
    navbar: [
      '首页',
      '交易记录',
      '结算记录',
      '提现记录',
      '结算汇总',
      // '货币结算',
      '开发文档'
    ],
    card: {
      apply: {
        head: '应用申报',
        content: '接受在线或应用内付款'
      },
      record: {
        head: '交易记录',
        content: '了解收支情况。您可以在这里查看最近的交易'
      },
      withdrawal: {
        head: '余额提现',
        content: '接受应用余额提现'
      }
    },
    headList: {
      product: '上线列表',
      approval: '审核列表'
    }
  },
  signup: {
    signtxt: '登录',
    form: {
      email: {
        label: '注册邮箱',
        placeholder: '请输入您要注册的邮箱地址',
        tips: {
          req: '请输入邮箱地址',
          err: '邮箱地址格式不正确'
        }
      },
      account: {
        label: '账号',
        placeholder: '请输入账号',
        tips: {
          req: '账号必填',
          err: '账号格式错误'
        }
      },
      sendCode: '发送验证码',
      code: {
        label: '邮箱验证码',
        placeholder: '请输入收到的邮箱验证码',
        tips: {
          req: '请填写验证码',
          err: ''
        }
      },
      pwd: {
        label: '密码',
        placeholder: '请输入密码',
        tips: {
          descTxt: '密码规则',
          desc: '密码规则:<br> - 密码长度为6到20个字符<br/> - 允许数字和大小写字母<br/> - 支持以下特殊字符：~`!@#$%^&*()_-+={}[]|;:,<>.?/' + '<br/> - 不允许4个以上的连续数字和字母<br/> - 不能全部为数字或字母<br/>',
          req: '请输入密码',
          err: '密码格式不符合规范'
        }
      },
      rPwd: {
        label: '确认密码',
        placeholder: '请再次输入密码',
        tips: {
          req: '请再次填写密码',
          err: '两次输入的密码不一致'
        }
      },
      btnTxt: '确认',
      notice: '我已阅读并同意 <a href="javascript:;">xPay服务协议</a>'
    },
    tips: {
      sendCode: '电子邮件已发送，请注意查收',
      regsuccess: '注册成功'
    }
  },
  login: {
    logintxt: '登录',
    form: {
      // email: {
      //   label: '注册邮箱',
      //   placeholder: '请输入邮箱地址',
      //   tips: {
      //     req: '请输入邮箱地址',
      //     err: '邮箱地址格式不正确'
      //   }
      // },
      identity: {
        label: '账号或邮箱',
        placeholder: '请输入邮箱或账号',
        tips: {
          req: '请输入邮箱或账号',
          err: ''
        }
      },
      // account: {
      //   label: '账号',
      //   placeholder: '请输入账号',
      //   tips: {
      //     req: '请输入账号',
      //     err: '账号格式错误'
      //   }
      // },
      pwd: {
        label: '密码',
        placeholder: '@:login.form.pwd.label',
        tips: {
          descTxt: '密码格式',
          req: '请输入密码'
        }
      },
      btnTxt: '登录',
      notice: '<a href="javascript:;">忘记密码?</a>'
    },
    tips: {
      logsuccess: '登录成功'
    }
  },
  tableList: {
    header: {
      operation: '操作'
    },
    appTable: {
      appName: '@:database.appName',
      result: '审核状态',
      appType: '应用类型',
      appNo: '应用号',
      appTyp: '应用类型',
      signKey: '签名关键字',
      syncUrl: '回调地址',
      countryList: '国家列表',
      ipList: 'ip白名单',
      createTime: '创建时间',
      appContent: '应用描述',
      appCate: '应用类型',
      ad: '创建时间'
    },
    recordTable: {
      searchForm: {
        searchType: '交易类型',
        str: '@:tableList.appTable.appNo',
        currency: '@:database.currency',
        orderNo: '@:tableList.recordTable.orderNo',
        payStatus: '@:tableList.recordTable.payStatus',
        payoutsStatus: '支付状态',
        startTime: '开始时间',
        endTime: '结束时间'
      },
      mchCallbackUrl: '商户回调地址',
      datestr: '银行卡',
      payoutsStatus: '支付状态',
      appName: '@:database.appName',
      appNo: '@:tableList.appTable.appNo',
      channelName: '支付通道',
      title: '支付能力',
      orderNo: '订单号',
      currency: '@:database.currency',
      mchOrderNo: '商户订单号',
      outAd: '@:common.revenue时间',
      ptmPaymentmode: 'paymentmode',
      mchParam: '商户透传参数',
      mchCustId: '交易客户号',
      custId: '交易客户号',
      amount: '支付金额',
      mchBackUrl: '支付返回地址',
      ad: '下单时间',
      payAd: '下单时间',
      payStatus: '支付状态',
      syncStatus: '同步状态',
      custPhone: '客户手机',
      custMail: '客户邮箱',
      custAccount: '客户账号',
      custIfcs: '客户Ifcs',
      custVpa: '客户Vpa',
      handFee: '手续费',
      handFeeRate: '手续费比率'
    },
    settleTable: {
      searchForm: {
        str: '@:tableList.appTable.appNo',
        appName: '@:database.appName',
        currency: '@:database.currency',
        orderNo: '@:tableList.recordTable.orderNo',
        payStatus: '@:tableList.recordTable.payStatus',
        payAd: '@:tableList.settleTable.payAd',
        ad: '@:tableList.settleTable.ad',
        startTime: '开始时间',
        endTime: '结束时间'
      },
      appNo: '@:tableList.appTable.appNo',
      appName: '@:database.appName',
      orderNo: '订单号',
      currency: '@:database.currency',
      amount: '交易金额',
      setAmount: '结算金额',
      handFee: '手续费',
      headFee: '手续费',
      headFeeRate: '手续费比率',
      exchangeRate: '美元汇率',
      payAd: '下单时间',
      payoutAd: '@:tableList.settleTable.ad',
      ad: '结算时间'
    },
    rateTable: {
      insummary: '收入汇总',
      outsummary: '@:common.revenue汇总',
      appName: '@:database.appName',
      appNo: '@:tableList.recordTable.appNo',
      currency: '@:database.currency',
      totalAmount: '收入金额',
      amount: '@:common.revenue金额',
      handFee: '@:common.revenue手续费',
      totalSetAmount: '结算金额',
      beAd: '开始时间',
      edAd: '结算时间',
      ad: '入库时间'
    },
    withdrawalTable: {
      searchForm: {
        currency: '@:database.currency',
        str: '@:tableList.recordTable.appNo',
        carryStatus: '@:tableList.withdrawalTable.carryStatus',
        startTime: '开始时间',
        endTime: '结束时间'
      },
      currency: '@:database.currency',
      amount: '提现金额',
      appNo: '@:tableList.appTable.appNo',
      appName: '@:database.appName',
      merchantName: '申请人',
      carryStatus: '提现状态',
      ad: '申请日期'
    },
    balanceWithdrawal: {
      searchForm: {
        currency: '@:database.currency',
        str: '@:tableList.recordTable.appNo'
      },
      currency: '@:database.currency',
      appNo: '@:tableList.recordTable.appNo',
      amount: '可提现余额',
      ad: 'application date'
    }
  },
  formList: {
    step: {
      0: '公司信息',
      1: '申请应用',
      2: '信息审核',
      3: '成功',
      4: '商户账号'
    },
    common: {
      add: '',
      submit: '提交成功',
      edit: '修改成功',
      p: '请输入',
      r: '必填',
      v: '格式错误'
    },
    accInfo: {
      account: {
        label: '账号',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      email: {
        label: '电子邮箱',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      pwd: {
        label: '密码',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      merchant: {
        label: '商户名',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      userPhone: {
        label: '手机号',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      }
    },
    comInfo: {
      companyName: {
        label: '公司名',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      regAddress: {
        label: '公司地址',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      phone: {
        label: '联系方式',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      createTime: {
        label: '成立时间',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      allotedTime: {
        label: '经营期限',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      businessScope: {
        label: '经营范围',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankInfo: {
        label: '开户行名称',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankAddress: {
        label: '银行地址',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankNum: {
        label: '银行账号',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      bankCode: {
        label: 'SWIFT代码',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      businessLicense: {
        label: '营业执照',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      contract: {
        label: '合同文件',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      idCard: '身份证',
      cardFront: {
        label: '正面',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      cardBack: {
        label: '反面',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      tips: {
        image: '支持拓展名: jpg, jpeg, png, webp'
      }
    },
    applyApp: {
      appName: {
        label: '应用名',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appNo: {
        label: '应用号',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appTyp: {
        label: '应用类型',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appAddress: {
        label: '网上商店网站/ APP下载地址',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appContent: {
        label: '应用描述',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appCate: {
        label: '应用所属类目',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      signKey: {
        label: '签名关键字',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      syncUrl: {
        label: '同步地址',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      countryList: {
        label: '目标国家',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      ipList: {
        label: 'ip白名单',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      ad: {
        label: '创建时间',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      tips: {
        submit: '提交成功,等待审核'
      }
    },
    withdrawal: {
      amount: {
        label: '提现金额',
        placeholder: '',
        tips: {
          req: '',
          err: ''
        }
      },
      appNo: {
        label: '@:tableList.appTable.appNo',
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
    },
    balanceWithdrawal: {
      amount: {
        label: '提现金额',
        placeholder: '',
        tips: {
          req: '',
          err: '请确认输入的金额是否有误,仅可输入整数金额'
        }
      },
      appNo: {
        label: '@:tableList.appTable.appNo',
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
  messages: 'test message',
  statusCode: {
    4010: '该邮箱已注册，请直接登录!',
    4011: '系统发生异常，请联系管理员!',
    4012: '验证码未过期， 请勿重复获取',
    4013: '邮箱输入错误或验证码已过期，请仔细检查',
    4014: '两次密码不一致，请重新输入',
    4015: '验证码错误',
    4016: 'token错误',
    4017: '账号未注册',
    4018: '账号或密码错误',
    4019: '账号未登录，请先登录账号',
    4020: 'token失效',
    4021: '文件上传失败',
    4022: '文件上传失败',
    4023: '文件key错误',
    4024: '未查询到该应用，请确认输入是否正确',
    4025: '邮件发送异常，请检查邮箱地址是否正确!',
    4026: 'excel导出异常!',
    4027: '公司信息修改失败!',
    4028: '该账号不可用!',
    4029: '你没有该应用,无法修改!',
    4030: '没有查到数据',
    4031: '没有内容，不可导出!',
    4032: '审核中应用无法修改',
    4033: '审核成功无法修改',
    4034: '信息提交成功，不可重复提交',
    4035: '审核中，无法修改!',
    4036: '余额不足，不可提现',
    4037: '不可提现，请确认是否正确'
  },
  errCode: '服务器错误',
  mapConfig: {
    account: {
      appTyp: {
        1: 'App',
        2: '网站',
        3: '手机网站'
      },
      result: {
        1: '审核中',
        2: '未通过',
        3: '通过'
      }
    },
    record: {
      payStatus: {
        0: '支付中',
        1: '成功',
        2: '失败'
      },
      payoutsStatus: {
        0: '交易中',
        1: '转账成功',
        2: '转账失败'
      },
      syncStatus: {
        '-1': '不再反馈',
        0: '待反馈',
        1: '同步成功',
        2: '同步失败'
      },
      searchType: {
        0: '收入',
        1: '代付'
      }
    },
    withdrawal: {
      carryStatus: {
        1: '待审核',
        2: '通过',
        3: '拒绝'
      }
    }
  }
}
