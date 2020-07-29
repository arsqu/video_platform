export const crossUrl = {
  open: {
    login: '/merchant/login',
    logOut: '/merchant/login/out',
    register: {
      sendMail: '/merchant/send/email',
      toRegister: '/merchant/reg'
    }
  },
  account: {
    currency: {
      query: '/exchange/rate/list'
    },
    merchant: {
      query: '/merchant/find',
      edit: '/merchant/update'
    },
    company: {
      query: '/company/info/page',
      save: '/company/info/save',
      saveFile: '/file/upload',
      edit: '/company/info/update'
    },
    app: {
      queryApp: '/app/page',
      edit: '/app/update',
      save: '/app/audit/save/{type}',
      // save: '/app/audit/save',
      approval: '/app/audit/list/app/info',
      updApproval: '/app/audit/update'
    },
    record: {
      query: {
        in: '/alipay/order/page',
        detl: '/paytm/order/result/list/{orderId}',
        out: '/paytm/pay/out/page'
      },
      exportExcel: {
        in: '/alipay/order/export/excel',
        out: '/paytm/pay/out/export/excel'
      }
    },
    settlement: {
      query: {
        in: '/order/settlement/page',
        out: '/payout/settlement/page'
      },
      detl: {
        in: '/order/settlement/find/order/info',
        out: '/payout/settlement/find/payout/info'
      }
    },
    summary: {
      query: {
        in: '/merchant/settlement/page/settlement',
        out: '/merchant/payout/settlement/page/payout/settlement'
      }
    },
    // 余额提现
    balanceWithdrawal: {
      query: '/merchant/settlement/find/amount',
      approval: '/merchant/withdrawal/save'
    },
    withdrawal: {
      query: '/merchant/withdrawal/page'
    }
  }
}
