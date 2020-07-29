<template>
  <div id="accountInfo">
    <a-form-model
      ref="ruleForm"
      layout="horizontal"
      :rules="rules"
      :model="ruleForm"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <input type="hidden" v-model="ruleForm.id" />
      <input type="hidden" v-model="ruleForm.merchantId" />
      <a-form-model-item :label="mWords('account','l')" prop="account">
        <a-input
          type="text"
          v-model="ruleForm.account"
          disabled
          :placeholder="mWords('account','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('email','l')" prop="email">
        <a-input type="text" v-model="ruleForm.email" disabled :placeholder="mWords('email','p')" />
      </a-form-model-item>
      <a-form-model-item :label="mWords('pwd','l')" prop="pwd">
        <a-input type="password" v-model="ruleForm.pwd" :placeholder="mWords('pwd','p')" />
      </a-form-model-item>
      <a-form-model-item :label="mWords('merchant','l')" prop="merchant">
        <a-input type="text" v-model="ruleForm.merchant" :placeholder="mWords('merchant','p')" />
      </a-form-model-item>
      <a-form-model-item :label="mWords('userPhone','l')" prop="userPhone">
        <a-input type="text" v-model="ruleForm.userPhone" :placeholder="mWords('userPhone','p')" />
      </a-form-model-item>
      <a-form-model-item class="text-center" wrapperCol="{span: 24}">
        <a-button
          type="primary"
          :loading="loading"
          @click="submitForm"
          style="width:150px"
        >{{this.$t('btnGroup.submit')}}</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formItemlabelCol: { span: 6 },
      formItemwrapperCol: { span: 10 },
      loading: false,
      // 信息表单
      ruleForm: {
        id: '',
        merchantId: '',
        account: '',
        email: '',
        pwd: '',
        merchant: '',
        userPhone: ''
      },
      // validate rule
      rules: {
        account: [
          {
            required: true,
            message: this.mWords('account', 'r'),
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: this.mWords('email', 'r'),
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: this.mWords('pwd', 'r'),
            trigger: 'blur'
          }
        ],
        merchant: [
          {
            required: true,
            message: this.mWords('merchant', 'r'),
            trigger: 'blur'
          }
        ],
        userPhone: [
          {
            required: true,
            message: this.mWords('userPhone', 'r'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    console.log(this.ruleForm)
    // 公司信息
    this.$axios.postData('account.merchant.query', {}).then(res => {
      console.log(res)
      if (res.code === 200) {
        var data = res.data
        this.ruleForm = data
        console.log('赋值')
      }
    })
  },
  methods: {
    // 匹配对应语言
    mWords(key, text) {
      return this.$util.mWords('formList.accInfo', key, text)
    },
    // 表单验证
    validForm() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            resolve(1)
          } else {
            resolve()
          }
        })
      })
    },
    // 修改信息
    updateInfo() {
      var v = this.ruleForm
      v = Object.assign({}, v)
      this.loading = true
      this.$axios
        .postData('account.merchant.edit', v)
        .then(res => {
          console.log(res)
          this.loading = false
          if (res.code === 200) {
            this.$util.Message('success', this.$t('formList.common.edit'))
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    async submitForm(e) {
      var valid = await this.validForm() // 表单
      if (valid) {
        console.log('可以提交')
        // 真代表已存在为编辑信息,否则为添加信息
        this.updateInfo()
      }
    }
  }
}
</script>

<style style="stylus" scoped>
</style>
