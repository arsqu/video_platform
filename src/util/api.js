export const crossUrl = {
  open: {
    login: '/admin/login',
    logOut: '/user/out',
    register: {
      sendMail: '/user/send/email',
      toRegister: '/user/reg'
    }
  },
  permission: {
    account: {
      query: '/admin/list'
    }
  },
  video: {
    callList: {
      query: '/agora/call/list'
    },
    scale: {
      query: '/agora/query/scale'
    },
    experience: {
      query: '/agora/query/experience'
    },
    network: {
      query: '/agora/query/network'
    },
    abnormal: {
      query: '/agora/exception/diagnosis'
    }
  },
  user: {
    user: {
      query: '/user/page',
      allot: '/user/update'
    },
    active: {
      query: '/user/get/active'
    }
  },
  audit: {
    anchor: {
      query: '/anchor/page',
      allot: '/anchor/audit'
    },
    withdraw: {
      query: '/user/withdraw/page',
      allot: '/user/withdraw/audit'
    },
    feedback: {
      query: '/inform/page',
      allot: '/inform/update'
    }
  },
  record: {
    pay: {
      query: '/gold/info/page'
    },
    recharge: {
      query: '/user/rec/page'
    },
    withdraw: {
      query: '/user/withdraw/page'
    }
  },
  statistics: {
    pay: {
      query: '/gold/info/page/statistics'
    },
    recharge: {
      query: '/user/rec/page/count'
    },
    withdraw: {
      query: '/user/withdraw/page/statistical'
    }
  },
  control: {
    gifts: {
      query: '/dictionary/page',
      save: '/dictionary/save/gifts',
      upd: '/dictionary/update/gifts'
    },
    upload: {
      query: '/apk/page',
      save: '/apk/upload',
      upd: '/apk/upload'
    }
  }
}
