<template>
  <a-layout-header>
    <div class="head_top">
      <a-icon
        class="toggleAside icon icon_svg"
        :type="!collapsed ? 'menu-fold' : 'menu-unfold'"
        @click="toggleAside"
      ></a-icon>
      <!-- <a-icon class="icon icon_svg" type="menu-fold" /> -->
      <!-- <slot name="breadcrumb" /> -->
      <breadcrumb :breadData="getBread" />
      <a-dropdown placement="bottomRight" class="switch_lang">
        <span class="ant-dropdown-link" @click="e => e.preventDefault()">
          <!-- {{language}} -->
          <a-icon class="icon icon_svg" type="global"></a-icon>
        </span>
        <a-menu slot="overlay">
          <a-menu-item
            v-for="(item, idx) in langConfig"
            :key="idx"
            :class="{ active: idx == locale }"
          >
            <a href="javascript:;" @click="changeLocale(idx)">{{ item.v }}</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <div class="logout_btn" @click="logout">登出</div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const breadcrumb = () => import('@views/module/breadcrumb')

export default {
  components: {
    breadcrumb
  },
  computed: {
    ...mapGetters(['getLang']),
    language() {
      return this.langConfig[this.getLang].k
    }
  },
  data() {
    return {
      publicPath: '',
      locale: '',
      langConfig: {},
      lang: [] // 支持的语言
    }
  },
  props: {
    collapsed: Boolean,
    toggleAside: {
      type: Function,
      default() {
        return function() {}
      }
    }
  },
  created() {
    this.publicPath = this.$util.getPublicPath()
    this.langConfig = this.$util.getLangConfig('lang')
  },
  mounted() {
    this.locale = this.getLang // 显示的语言
  },
  methods: {
    ...mapActions(['setLang']),
    // 登出
    logout() {
      this.$Modal.confirm({
        title: '确定要退出吗?',
        okType: 'danger',
        onOk: _ => {
          console.log('OK')
          this.$axios
            .postData('open.logOut', {})
            .then(res => {
              console.log(res)
              this.$util.clearItem()
              this.$util.Message('即将跳转登录页')
              setTimeout(_ => {
                location.href = this.publicPath + 'login.html'
              }, 500)
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    // 改变语言
    changeLocale(locale) {
      if (locale === 'en') {
        this.$i18n.locale = 'en'
        moment.locale('en') // 时间控件
      } else {
        this.$i18n.locale = 'zh'
        moment.locale('zh-cn')
        console.log('中文', moment.locale())
      }
      localStorage.setItem('language', locale)
      this.language = this.langConfig[this.getLang].k
      this.locale = locale
      this.setLang(locale) // 异步更新状态
    }
  }
}
</script>

<style lang="stylus">
.switch_lang
  color #666
  padding 0 15px
  cursor pointer
  transition .45s ease
  height 100%
  &:hover
    background #f5f5f5
  .icon_svg
    font-size 20px
</style>
