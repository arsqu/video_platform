<template>
  <div class="csfooter">
    <div class="txtGroup">
      <ul>
        <li>
          <a-dropdown :trigger="['click']" placement="topCenter">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ language }}
              <img src="~@assets/image/svg/down.svg" class="svg svg-down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(item, idx) in langConfig"
                :key="idx"
                :class="{ active: idx == locale }"
              >
                <a href="javascript:;" @click="changeLocale(idx)">{{
                  item.v
                }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//  mapGetters,
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      locale: '',
      langConfig: {},
      lang: [] // 支持的语言
    }
  },
  computed: {
    ...mapGetters(['getLang']),
    language() {
      return this.langConfig[this.getLang].k
    }
  },
  created() {
    this.langConfig = this.$util.getLangConfig('lang')
  },
  mounted() {
    this.locale = this.getLang // 显示的语言
  },
  methods: {
    ...mapActions(['setLang']),
    showDev() {
      this.$util.Message(this.$t('common.construction'))
    },
    // 改变语言
    changeLocale(locale) {
      if (locale === 'en') {
        this.$i18n.locale = 'en'
        moment && moment.locale('en') // 时间控件
      } else {
        this.$i18n.locale = 'zh'
        moment && moment.locale('zh-cn')
        // console.log('中文', moment.locale())
      }
      localStorage.setItem('language', locale)
      this.language = this.langConfig[this.getLang].k
      this.locale = locale
      this.setLang(locale) // 异步更新状态
    }
  }
}
</script>

<style lang="stylus" scoped>
.csfooter
  width 100%
  padding 5px 0
  background #fff
  position fixed
  bottom 0
  z-index 100
  border-top 1px solid #eee
  .svg-down
    height 13px
    -webkit-transform rotate(180deg)
    transform rotate(180deg)
    vertical-align middle
  .txtGroup
    width 95%
    margin 0 auto
    text-align center
    font-size 0
    ul
      margin-bottom 0
      padding-left 0
      display inline-block
      li
        display inline-block
        font-size 14px
        padding 0 10px
        list-style none
</style>
