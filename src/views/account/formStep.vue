<template>
  <div id="formStep">
    <cusStep v-if="this.getShowStep == 'hide'" />
    <div class="formBox">
      <!-- this.$route.query.type -->
      <div class="form_head">{{$t('formList.step')[this.getStep]}}</div>
      <!-- 账户信息 -->
      <accountInfo v-if="this.getStep == 4 || this.getShowStep == 0" />
      <!-- 公司信息 -->
      <companyInfo v-else-if="this.getStep == 0 || this.getShowStep == 1" />
      <!-- 应用信息,刷新不记录 -->
      <applyApp :ruleForm="ruleForm" v-else-if="this.getStep == 1" />
      <!-- 提示页面,刷新不记录 -->
      <cusResult v-else-if="this.getStep == 2" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import companyInfo from '@components/form/companyInfo'
import applyApp from '@components/form/applyApp'
const cusStep = () => import('@components/step')
const accountInfo = () => import('@components/form/accountInfo')
const cusResult = () => import('@components/result')

export default {
  components: {
    cusStep,
    companyInfo,
    applyApp,
    accountInfo,
    cusResult
  },
  computed: {
    // vuex内存数据 页面刷新数据
    ...mapGetters(['getStep', 'getShowStep'])
  },
  data() {
    return {
      // 申请应用
      ruleForm: {
        id: '',
        appName: '',
        appType: 1,
        appAddress: '',
        appContent: '',
        appCate: ''
      }
    }
  },
  mounted() {
    var type = this.$route.query.type
    if (type === '0') {
      this.setStep(4)
    } else if (type === '1') {
      this.setStep(0)
    }
  },
  methods: {
    ...mapActions(['setStep'])
  }
}
</script>

<style lang="stylus" scoped>
#formStep
  .formBox
    border-radius 8px
    background #fff
    margin-bottom 35px
    -webkit-box-shadow 0 0 5px 0 #ccc
    box-shadow 0 0 5px 0 #ccc
  & .form_head
    background #F7F7F7
    color #333
    padding 10px 30px
    margin-bottom 25px
  & >>> .ant-form
    padding 0 20px 30px
</style>
