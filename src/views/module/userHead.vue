<template>
  <div :class="['header',slide ?'mobile':'']">
    <div class="nav_box">
      <div class="nav_mobile">
        <!-- <img src="/static/image/icon/close.png" class="icon icon_close" @click="closeNav" /> -->
        <a-icon type="close-square" class="icon icon_svg icon_close" @click="closeNav" />
        <div class="u_name">{{getUname}}</div>
      </div>
      <ul class="side_menu">
        <li v-for="(item,idx) in navbar" :key="idx" :class="{active:$route.name == (item.to.name)}">
          <!-- a标签href做跳转会卡顿 -->
          <router-link :to="item.to" :tag="item.tag" @click.native="_=>{doExtra(idx,1)}">
            <span>{{$t(item.text)}}</span>
          </router-link>
        </li>
      </ul>
      <ul class="tool">
        <li>
          <a href="javascript:;">
            <span>
              <a-dropdown>
                <a class="ant-dropdown-link" href="javascript:;">
                  <a-icon class="icon icon_svg" type="setting" />
                </a>
                <a-menu slot="overlay">
                  <a-menu-item v-for="(item,idx) in navTool" :key="idx">
                    <router-link
                      :tag="item.tag"
                      :to="item.to"
                      @click.native="_=>{doExtra(idx)}"
                    >{{$t(item.text)}}</router-link>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              <!-- <img class="icon icon_system" src="/static/image/icon/system.png" /> -->
            </span>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <span @click="logout">{{$t('userHead.logout')}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar_box">
      <div class="navbar_icon">
        <span @click="toggleNav">
          <!-- <a-icon class="icon icon_svg" type="bars" /> -->
          <a-icon class="icon icon_svg" type="menu-unfold" />
          <!-- <img class="icon icon_navbar" src="/static/image/icon/navbar.png" /> -->
        </span>
      </div>
      <div class="navbar_logo">
        <a-icon class="icon icon_svg" type="setting" />
        <!-- <img class="icon icon_system" src="/static/image/icon/system.png" /> -->
      </div>
      <div class="navbar_iconGroup">
        <!-- <a-icon class="icon icon_svg" type=""></a-icon> -->
        <img class="icon icon_message" src="~@assets/image/icon/message.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getUname'])
  },
  data() {
    return {
      publicPath: '',
      slide: false,
      navTool: [
        {
          text: 'userHead.navTool[0]',
          tag: 'a',
          to: { name: 'accFormStep', query: { type: '0' } }
        },
        {
          text: 'userHead.navTool[1]',
          tag: 'a',
          to: { name: 'accFormStep', query: { type: '1' } }
        }
      ],
      navbar: [
        {
          text: 'account.navbar[0]',
          tag: 'a',
          to: { name: 'accMain' }
        },
        {
          text: 'account.navbar[1]',
          tag: 'a',
          to: { name: 'accRecord' }
        },
        {
          text: 'account.navbar[2]',
          tag: 'a',
          to: { name: 'accSettle' }
        },
        {
          text: 'account.navbar[4]',
          tag: 'a',
          to: { name: 'accRate' }
        },
        {
          text: 'account.navbar[3]',
          tag: 'a',
          to: { name: 'accWithdrawal' }
        },
        {
          text: 'account.navbar[5]',
          tag: 'a',
          to: { name: '' }
        }
      ]
    }
  },
  created() {
    this.publicPath = this.$util.getPublicPath()
  },
  methods: {
    ...mapActions(['setStep']),
    doExtra(idx, ev) {
      if (!ev) {
        // account
        if (idx === 0) {
          this.setStep(4)
        } else if (idx === 1) {
          // company
          this.setStep(0)
        } else {
        }
      } else {
        // document
        if (idx === 5) {
          window.open('https://dev.muzeglobal.com/#/pay')
        }
      }
    },
    // 加载商户应用
    toggleNav() {
      this.slide = !this.slide
    },
    closeNav() {
      console.log(false)
      this.slide = false
    },
    logout() {
      this.$axios
        .postData('open.logOut', {})
        .then(res => {
          if (res.code === 200) {
            this.$util.clearItem()
            location.href = this.publicPath + 'login.html'
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav_mobile >>> .icon_close
  position absolute
  right -25px
  top 13px
.header
  position fixed
  left 0
  right 0
  top 0
  width 100%
  z-index 100
  -webkit-transition height 1s linear
  transition height 1s linear
  .navbar_box, .nav_mobile
    display none
  background #1A86D3
  .nav_box
    font-size 0
    width 100%
    position relative
    max-width 980px
    -webkit-transition all .35s ease
    transition all .35s ease
    margin 0 auto
    height 62px
    //min-height 56px
    //max-height 60px
    .u_name
      font-size 16px
      color #fff
      text-align center
      margin 30px auto
      font-weight bold
    ul
      display inline-block
      float left
      padding-top 20px
      //width 80%
      &.tool
        //width 20%
        float right
        text-align center
        li
          margin 0 5px
      li
        list-style none
        font-size 14px
        vertical-align top
        margin 0 20px
        cursor pointer
        //padding 20px 0
        display inline-block
        //vertical-align middle
        color #fff
        &:hover span, &.active span
          border-color #fff
        a
          display inline-block
          width 100%
          color #fff
          //padding-bottom 10px
        span
          display inline-block
          -webkit-transition border-color .75s ease
          transition border-color .75s ease
          padding-bottom 11px
          //padding-bottom 8px
          border-bottom 1px solid transparent
</style>
