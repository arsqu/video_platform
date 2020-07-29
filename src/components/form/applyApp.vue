<template>
  <div class="comInfoForm">
    <a-form-model
      ref="ruleForm"
      layout="horizontal"
      :rules="rules"
      :model="ruleForm"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <input type="hidden" v-model="ruleForm.id" />
      <a-form-model-item :label="mWords('appName','l')" prop="appName">
        <a-input size="large" v-model="ruleForm.appName" :placeholder="mWords('appName','p')" />
      </a-form-model-item>
      <a-form-model-item :label="mWords('appTyp','l')" prop="appType">
        <a-select size="large" v-model="ruleForm.appType">
          <a-select-option
            v-for="(item,idx) in $t('mapConfig.account.appTyp')"
            :key="idx"
            :value="+idx"
          >{{item}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="mWords('appAddress','l')" prop="appAddress">
        <a-input
          type="text"
          size="large"
          v-model="ruleForm.appAddress"
          :placeholder="mWords('appAddress','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('appContent','l')" prop="appContent">
        <a-input
          type="text"
          size="large"
          v-model="ruleForm.appContent"
          :placeholder="mWords('appContent','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('appCate','l')" prop="appCate">
        <a-input
          type="text"
          size="large"
          v-model="ruleForm.appCate"
          :placeholder="mWords('appCate','p')"
        />
      </a-form-model-item>
      <a-form-model-item class="text-center">
        <a-button
          size="large"
          type="primary"
          :loading="loading"
          @click="submitForm"
          style="width:150px"
        >{{$t('btnGroup.submit')}}</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted() {
    console.log(this.appType)
  },
  props: {
    postType: String,
    ruleForm: Object
  },
  data() {
    return {
      mapConfig: {},
      loading: false,
      rules: {
        appName: [
          {
            required: true,
            message: this.mWords('appName', 'r'),
            trigger: 'blur'
          }
        ],
        appType: [
          {
            required: true,
            message: this.mWords('appTyp', 'r'),
            trigger: 'blur'
          }
        ],
        appAddress: [
          {
            required: true,
            message: this.mWords('appAddress', 'r'),
            trigger: 'blur'
          }
        ],
        appContent: [
          {
            required: true,
            message: this.mWords('appContent', 'r'),
            trigger: 'blur'
          }
        ],
        appCate: [
          {
            required: true,
            message: this.mWords('appCate', 'r'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setStep', 'setResult']),
    mWords(key, text) {
      return this.$util.mWords('formList.applyApp', key, text)
    },
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(1)
          } else {
            resolve(false)
          }
        })
      })
    },
    async submitForm(e) {
      var valid = await this.validForm() // 表单
      if (valid) {
        console.log('可以提交')
        this.addApp()
      }
    },
    // 添加app
    addApp() {
      var v = this.ruleForm
      v.status = 1 // 默认开启
      this.loading = true
      var url = !this.postType
        ? (delete v.id, 'account.app.save')
        : 'account.app.updApproval'
      v.type = v.appType
      this.$axios
        .addApp(url, v)
        .then(res => {
          console.log(res)
          this.loading = false
          if (res.code === 200) {
            this.setStep(2)
            this.$util.Message(
              'success',
              this.$t('formList.applyApp.tips.submit')
            )
            this.setResult(this.$t('components.result.app'))
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.comInfoForm
  width 80%
  margin 0 auto
</style>
