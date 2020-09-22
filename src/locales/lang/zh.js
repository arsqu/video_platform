export default {
  common: {
    construction: '功能正在建设中...'
  },
  searchForm: {
    startTime: '开始时间',
    endTime: '结束时间'
  },
  tips: {
    success: {
      def: '操作成功'
    },
    valid: {
      image: '仅支持 jpg, jpeg, png, webp 格式',
      svga: '仅支持 svga 格式的文件'
    },
    error: {
      def: '操作失败'
    }
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
    add: '新增',
    export: '导出',
    file: {
      svga: '选择svga文件'
    }
  },
  permission: {
    account: {
      defTable: {
        account: '账号',
        createTime: '创建时间'
      },
      defForm: {
        account: {
          label: '账号'
        }
      }
    }
  },
  video: {
    callList: {
      searchForm: {
        cname: '频道名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        cname: '@:video.callList.searchForm.cname',
        created_ts: '通话开始',
        destroyed_ts: '通话结束',
        finished: '通话状态'
      }
    },
    scale: {
      searchForm: {
        metric: '查询指标',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        pcc: '@:mapConfig.video.scale.metric.pcc',
        pcu: '@:mapConfig.video.scale.metric.pcu',
        ts: '时间'
      }
    },
    experience: {
      searchForm: {
        metric: '查询指标',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        joinSuccessRate: '@:mapConfig.video.experience.metric.joinSuccessRate',
        joinSuccess5SecsRate: '@:mapConfig.video.experience.metric.joinSuccess5SecsRate',
        videoFreezeRate: '@:mapConfig.video.experience.metric.videoFreezeRate',
        audioFreezeRate: '@:mapConfig.video.experience.metric.audioFreezeRate',
        ts: '时间'
      }
    },
    network: {
      searchForm: {
        metric: '查询指标',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        videoUpstreamExcellentTransRate: '@:mapConfig.video.network.metric.videoUpstreamExcellentTransRate',
        audioUpstreamExcellentTransRate: '@:mapConfig.video.network.metric.audioUpstreamExcellentTransRate',
        videoEnd2EndExcellentTransRate: '@:mapConfig.video.network.metric.videoEnd2EndExcellentTransRate',
        audioEnd2EndExcellentTransRate: '@:mapConfig.video.network.metric.audioEnd2EndExcellentTransRate',
        ts: '时间'
      }
    },
    abnormal: {
      searchForm: {
        type: '类型',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        type: '@:abnormal.searchForm.type',
        cname: '频道名',
        ts: '时间',
        user: '异常用户Id',
        exp_id: '异常Id',
        exp_desc: '异常描述',
        factor_desc: '异常描述',
        factor_id: '异常id',
        host_user: '异常用户',
        createTime: '创建日期',
        updateTime: '修改日期'
      },
      defForm: {
        sysKey: {
          label: '@:control.gifts.defTable.sysKey'
        },
        rate: {
          label: '@:control.gifts.defTable.rate'
        },
        sysValue: {
          label: '@:control.gifts.defTable.sysValue'
        },
        sysFirstValue: {
          label: '@:control.gifts.defTable.sysFirstValue'
        }
      }
    }
  },
  user: {
    active: {
      defTable: {
        yesterdayActiveNum: '昨日用户活跃量',
        currentActiveNum: '当前用户活跃量',
        firstMonthNum: '上月用户活跃量',
        currentMonthActiveNum: '当月用户活跃量'
      }
    },
    user: {
      searchForm: {
        usta: '封禁状态',
        utype: '用户类型',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        uname: '用户名',
        registerDate: '注册时间',
        status: '是否删除',
        utype: '@:user.user.searchForm.utype',
        usta: '@:user.user.searchForm.usta',
        chCode: '渠道来源',
        loginTime: '登录时间',
        outTime: '离线时间',
        umail: '邮箱',
        bankName: '银行',
        code: '银行卡号',
        bust: '胸围',
        Waist: '腰部',
        Hips: '臀围',
        height: '身高',
        bodyWeight: '体重',
        bankCard: '银行卡',
        idCode: '身份证号',
        realNameAuth: '实名认证',
        profession: '职业',
        outward: '外貌特征',
        actualName: '真实姓名',
        freezeTime: '封号时间',
        upass: '密码',
        uph: '手机号',
        uimg: '头像',
        ulabel: '个性签名',
        usex: '性别',
        uaddress: '地址',
        ubirthday: '生日'
      },
      defForm: {}
    }
  },
  audit: {
    feedback: {
      searchForm: {
        type: '业务类型',
        result: '处理状态',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        type: '@:audit.feedback.searchForm.type',
        result: '@:audit.feedback.searchForm.result',
        createTime: '创建时间',
        updateTime: '修改时间',
        targetId: '被举报用户ID',
        infoDesc: '说明信息',
        phone: '手机号',
        informId: '举报ID',
        informTwoId: '违规ID',
        userName: '举报人',
        userName1: '反馈人',
        targetName: '被举报用户',
        informValue: '举报信息',
        informValue1: '反馈信息',
        report: '违规类型',
        report1: '反馈类型',
        uid: '用户ID'
      },
      defForm: {}
    },
    anchor: {
      searchForm: {
        approvalSta: '审核状态',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        source: '主播信息',
        anchorName: '主播名',
        headImg: '主播头像',
        anchorPh: '联系方式',
        approvalSta: '@:audit.anchor.searchForm.approvalSta',
        videoUrl: '主播视频',
        voiceUrl: '主播音频',
        imgUrl: '主播图片',
        content: '未通过原因',
        approvalDate: '提交日期'
      },
      defForm: {}
    },
    withdraw: {
      searchForm: {
        result: '提现状态',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        status: 'status',
        type: 'type',
        goldNum: '提现金额',
        amount: '到账金额',
        bardInfo: '银行卡信息',
        handFee: '提现手续费',
        content: '未通过原因',
        result: '@:audit.withdraw.searchForm.result',
        createTime: '申请日期',
        updateTime: '审批日期'
      },
      defForm: {}
    }
  },
  record: {
    pay: {
      searchForm: {
        str: '邮箱号',
        type: '收支类型',
        optType: '消费类型',
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        type: '@:statistics.pay.searchForm.type',
        optType: '@:statistics.pay.searchForm.optType',
        userName: '@:statistics.pay.searchForm.userName',
        createTime: '创建时间',
        updateTime: '修改时间',
        optDesc: '支付明细',
        goldNum: '金币数量',
        targetId: '目标ID',
        uid: '用户ID',
        result: '业务状态'
      },
      defForm: {}
    },
    recharge: {
      searchForm: {
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        userName: '@:statistics.pay.searchForm.userName',
        createTime: '创建时间',
        updateTime: '修改时间',
        recMoney: '充值金额',
        recCoin: '充值金币',
        rewardCoin: '奖励金币',
        recDate: '充值日期',
        uid: '用户ID'
      },
      defForm: {}
    },
    withdraw: {
      searchForm: {
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        userName: '@:statistics.pay.searchForm.userName',
        createTime: '提现日期',
        updateTime: '修改时间',
        goldNum: '提现金币',
        amount: '到账金额',
        handFee: '提现手续费',
        content: '失败原因',
        result: '是否成功',
        bardInfo: '银行卡',
        uid: '用户ID'
      },
      defForm: {}
    }
  },
  statistics: {
    pay: {
      searchForm: {
        type: '收支类型',
        optType: '消费类型',
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        type: '@:statistics.pay.searchForm.type',
        optType: '@:statistics.pay.searchForm.optType',
        userName: '@:statistics.pay.searchForm.userName',
        createTime: '创建时间',
        updateTime: '修改时间',
        optDesc: '支付明细',
        goldNum: '金币数量',
        targetId: '目标ID',
        uid: '用户ID',
        result: '业务状态'
      },
      defForm: {}
    },
    recharge: {
      searchForm: {
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        userName: '@:statistics.pay.searchForm.userName',
        recDate: '充值日期',
        recMoney: '充值金额总数',
        recCoin: '充值金币总数',
        rewardCoin: '奖励金币总数',
        uid: '用户ID'
      },
      defForm: {}
    },
    withdraw: {
      searchForm: {
        userName: '用户名',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        userName: '@:statistics.pay.searchForm.userName',
        createTime: '提现日期',
        updateTime: '修改时间',
        goldNum: '提现总金币',
        amount: '到账总金额',
        handFee: '提现手续费',
        content: '失败原因',
        result: '是否成功',
        bardInfo: '银行卡',
        uid: '用户ID'
      },
      defForm: {}
    }
  },
  control: {
    gifts: {
      searchForm: {
        type: '类型',
        startTime: '@:searchForm.startTime',
        endTime: '@:searchForm.endTime'
      },
      defTable: {
        type: '@:control.gifts.searchForm.type',
        sysKey: '礼物金币数额',
        sysValue: 'svga图',
        result: '是否启用',
        sysFirstValue: '礼物图片',
        rate: '礼物抽取费率',
        createTime: '创建日期',
        updateTime: '修改日期'
      },
      defForm: {
        sysKey: {
          label: '@:control.gifts.defTable.sysKey'
        },
        result: {
          label: '@:control.gifts.defTable.result'
        },
        rate: {
          label: '@:control.gifts.defTable.rate'
        },
        sysValue: {
          label: '@:control.gifts.defTable.sysValue'
        },
        sysFirstValue: {
          label: '@:control.gifts.defTable.sysFirstValue'
        }
      }
    },
    upload: {
      searchForm: {},
      defTable: {
        oldVersion: '当前版本',
        lowestVersion: '最低支持',
        newVersion: '最新版本',
        forcibly: '是否强制更新',
        apkUrl: '安装包',
        content: '更新文案',
        createTime: '创建日期',
        updateTime: '修改日期'
      },
      defForm: {
        oldVersion: {
          label: '@:control.upload.defTable.oldVersion'
        },
        lowestVersion: {
          label: '@:control.upload.defTable.lowestVersion'
        },
        newVersion: {
          label: '@:control.upload.defTable.newVersion'
        },
        forcibly: {
          label: '@:control.upload.defTable.forcibly',
          tips: {
            req: '@:control.upload.defTable.forcibly'
          }
        },
        apkUrl: {
          label: '@:control.upload.defTable.apkUrl',
          tips: {
            req: '请上传安装包'
          }
        },
        content: {
          label: '@:control.upload.defTable.content'
        }
      }
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
        // label: '账号或邮箱',
        label: '账号',
        placeholder: '请输入账号',
        tips: {
          req: '请输入账号',
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
    }
  },
  formList: {
    common: {
      add: '',
      submit: '提交成功',
      edit: '修改成功',
      p: '请输入',
      r: '必填',
      v: '格式错误'
    }
  },
  messages: 'test message',
  statusCode: {
    5001: '文件上传异常',
    5002: '文件删除异常',
    5003: '邮箱发送异常',
    5004: '验证码未过期，请勿重复发送!',
    5005: '验证码已过期，请重新获取!',
    5006: '该账号已存在，请直接登录!',
    5007: '账号未注册!',
    5008: '密码错误，请重新输入!',
    5009: '账号未登录，请先登录账号',
    5010: 'token错误',
    5011: 'token已过期，请重新登录!',
    5012: 'TOKEN解析错误!',
    5013: '权限不足',
    5014: '验证码错误',
    5015: '用户不存在，请确认输入是否正确!',
    5016: '该用户未申请主播，请确认是否正确!',
    5017: '账号或密码错误'
  },
  errCode: '服务器错误',
  mapConfig: {
    video: {
      callList: {
        finished: {
          true: '已结束',
          false: '通话中中'
        }
      },
      scale: {
        metric: {
          pcu: '用户数',
          pcc: '频道数'
        }
      },
      experience: {
        metric: {
          joinSuccessRate: '加入成功率',
          joinSuccess5SecsRate: '五秒加入成功率',
          videoFreezeRate: '视频卡顿率',
          audioFreezeRate: '音频卡顿率'
        }
      },
      network: {
        metric: {
          videoUpstreamExcellentTransRate: '上行视频优质传输率',
          audioUpstreamExcellentTransRate: '上行音频优质传输率',
          videoEnd2EndExcellentTransRate: '视频优质传输率',
          audioEnd2EndExcellentTransRate: '音频优质传输率'
        }
      },
      abnormal: {
        type: {
          1: '音视频',
          2: '实时消息'
        }
      }
    },
    audit: {
      feedback: {
        result: {
          1: '未处理',
          2: '已处理'
        },
        type: {
          1: '举报',
          2: '反馈'
        }
      },
      anchor: {
        approvalSta: {
          1: '待审批',
          2: '成功',
          3: '拒绝'
        }
      },
      result: {
        0: '失败',
        1: '成功',
        2: '处理中'
      }
    },
    statistics: {
      pay: {
        type: {
          1: '充值',
          2: '视频',
          3: '音频',
          4: '刷礼物',
          5: '购买相册'
        },
        optType: {
          1: '支出',
          2: '收益'
        },
        result: {
          1: '已读',
          2: '未读'
        }
      }
    },
    user: {
      user: {
        usta: {
          1: '正常',
          2: '封禁'
        },
        utype: {
          1: '用户',
          2: 'vip',
          3: '主播'
          // 4: '管理员'
        },
        realNameAuth: {
          0: '未认证',
          1: '认证'
        },
        usex: {
          0: '女',
          1: '男'
        }
      }
    },
    control: {
      gifts: {
        type: {
          1: '礼物',
          2: '提现手续费'
        }
      },
      upload: {
        forcibly: {
          1: '不强制',
          2: '强制',
          3: '不更新'
        }
      }
    }
  }
}
