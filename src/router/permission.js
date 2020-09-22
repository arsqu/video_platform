import i18n from '@locales/index'
import router from './index'
import util from '@util/util'
import { NProgress } from '@util/nprogress'
import SVGA from 'svgaplayerweb'
import store from '@store'

const isProd = process.env.NODE_ENV === 'production'

Vue.directive('svga', {
  inserted: function (el, binding) {
    // console.log(el, binding, router);
    var url = binding.value
    if (!el) {
      Vue.prototype.$message.error('容器不存在,预览失败')
      return
    }
    if (!url) {
      Vue.prototype.$message.error('无法预览空地址')
      return
    }
    var target = ''
    // 开发环境通过不同前缀访问svga
    var baseView = +(el.getAttribute('data-base'))
    // 远程地址预览
    if (!baseView) {
      var reg = /^http(?:s)?:\/\/(.*?)\/(.*)/
      if (!reg.test(url)) {
        Vue.prototype.$message.error('请确认预览的地址是否正确')
        return
      }
    }
    // 开发环境加前缀预览(解决跨域)
    if (!isProd) {
      // 阿里云
      if (url.indexOf('aliyuncs') !== -1) {
        target = 'c'
      }
      // img.schat.com
      target += 'svga'
      console.log(url)
      if (!baseView) {
        url = url.match(reg)[2]
        url = '/' + target + '/' + url
      }
    }
    var id = target + '_' + parseInt(Math.random() * 10000)
    el.id = id
    console.log('创建一个loading')
    const player = new SVGA.Player('#' + id)
    const parser = new SVGA.Parser('#' + id)
    // 动画加载前的loading
    store.commit('setSvgLoad', true)
    // 加载svga动画
    parser.load(url, item => {
      store.commit('setSvgLoad', false)
      player.setVideoItem(item)
      player.startAnimation()
    }, err => {
      console.log(err)
      if (err === 'incorrect header check') {
        store.commit('setSvgLoad', false)
        Vue.prototype.$message.error('无法预览图片')
      }
    })
  }
})

// 按钮权限
Vue.directive('has', {
  inserted: function (el, binding) {
    // console.log(el, binding, router);
    if (typeof binding.value === 'boolean') {
      return binding.value
    }
    if (!permissionJudge(binding.value)) {
      el.parentNode.removeChild(el)
    }
  }
})

function permissionJudge(value) {
  var list = router.history.current
  if (list.meta.btnRole.indexOf(value) !== -1) { return true }
  return false
}

function routerGo(to, next) {
  // var role = getItem('role')
  // role = typeof role === 'string' ? JSON.parse(role) : role
  // menuList = util.loop(menuList, role, []) // 转换格式
  menuList = util.loop(menuList, []) // 转换格式
  console.log(menuList)
  menuList.push({ path: '*', redirect: '/404.html' })
  router.addRoutes(menuList)
  next({ ...to, replace: true })
}

function getItem(key) {
  return localStorage.getItem(key)
}

var menuList

var menu1 = [
  {
    id: '0',
    icon: 'setting',
    title: '系统管理',
    children: [
      {
        title: '账户管理',
        url: '/permission/account'
      }
    ]
  },
  {
    id: '1',
    icon: 'audio',
    title: '音视频数据',
    children: [
      {
        title: '24小时通话',
        url: '/video/callList'
      },
      {
        title: '实时网络',
        url: '/video/network'
      },
      {
        title: '实时体验',
        url: '/video/experience'
      },
      {
        title: '实时规模',
        url: '/video/scale'
      },
      {
        title: '异常诊断',
        url: '/video/abnormal'
      }
    ]
  },
  {
    id: '2',
    icon: 'user',
    title: '用户管理',
    children: [
      {
        title: '注册用户',
        url: '/user/list'
      },
      {
        title: '用户活跃量',
        url: '/user/active'
      }
    ]
  },
  {
    id: '3',
    icon: 'audit',
    title: '审核反馈',
    children: [
      {
        title: '主播审核',
        url: '/audit/anchor'
      },
      {
        title: '提现审核',
        url: '/audit/withdraw'
      },
      {
        title: '举报反馈',
        url: '/audit/feedback'
      }
    ]
  },
  {
    id: '4',
    icon: 'transaction',
    title: '资金记录',
    children: [
      {
        title: '消费记录',
        url: '/record/pay'
      },
      {
        title: '充值记录',
        url: '/record/recharge'
      },
      {
        title: '提现记录',
        url: '/record/withdraw'
      }
    ]
  },
  {
    id: '5',
    icon: 'bar-chart',
    title: '统计管理',
    children: [
      {
        title: '消费统计',
        url: '/statistics/pay'
      },
      {
        title: '充值统计',
        url: '/statistics/recharge'
      },
      {
        title: '提现统计',
        url: '/statistics/withdraw'
      }
    ]
  },
  {
    id: '6',
    icon: 'control',
    title: 'APP设置',
    children: [
      {
        title: '安装包管理',
        url: '/control/upload'
      },
      {
        title: '礼物管理',
        url: '/control/gifts'
      }
    ]
  }
]
localStorage.setItem('menuList', JSON.stringify(menu1))

router.beforeEach((to, from, next) => {
  console.log(from, to)
  var isLogin = getItem('token')
  if (isLogin) {
    NProgress.start()
    if (!menuList) {
      menuList = getItem('menuList')
      menuList = typeof menuList === 'string' ? JSON.parse(menuList) : menuList
      routerGo(to, next)
      // debugger
    } else {
      next()
    }
  } else {
    menuList = null
    // 登录提示
    Vue.prototype.$message.error(i18n.t('statusCode.5009'))
    util.setPath(from.fullPath)
    util.clearItem()
    util.toLogin()
  }
})

router.afterEach(() => {
  NProgress.done()
})
