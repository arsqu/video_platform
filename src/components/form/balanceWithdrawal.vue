<template>
  <div class="withdrawalForm">
    <a-form-model
      ref="ruleForm"
      layout="horizontal"
      :rules="rules"
      :model="ruleForm"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <input type="hidden" v-model="ruleForm.appId" />
      <a-form-model-item :label="mWords('appNo','l')" prop="appNo">
        <a-input size="large" v-model="ruleForm.appNo" disabled :placeholder="mWords('appNo','p')" />
      </a-form-model-item>
      <!-- <a-form-model-item :label="mWords('currency','l')" prop="currency">
        <a-input
          size="large"
          v-model="ruleForm.currency"
          disabled
          :placeholder="mWords('currency','p')"
        />
      </a-form-model-item>-->
      <a-form-model-item :label="mWords('amount','l')" prop="amount">
        <a-input type="text" size="large" v-model="ruleForm.amount" :suffix="ruleForm.currency"></a-input>
        <!-- <a-input-number v-model="ruleForm.amount" :min="0" :max="ruleForm.max" /> -->
        <!-- <a-input
          type="text"
          size="large"
          v-model="ruleForm.amount"
          :placeholder="mWords('amount','p')"
        />-->
      </a-form-model-item>
      <a-form-model-item class="text-center">
        <slot name="footer" :ruleForm="this.ruleForm"></slot>
        <!-- <a-button
          size="large"
          type="primary"
          :loading="loading"
          @click="submitForm"
          style="width:150px"
        >{{$t('btnGroup.submit')}}</a-button>-->
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: {
    ruleForm: Object,
    asyncSel: Object
  },
  data() {
    return {
      mapConfig: {},
      loading: false,
      rules: {
        appId: [
          {
            required: true,
            message: this.mWords('appName', 'r'),
            trigger: 'blur'
          }
        ],
        currency: [
          {
            required: true,
            message: this.mWords('currency', 'r'),
            trigger: 'blur'
          }
        ],
        amount: [
          {
            required: true,
            message: this.mWords('amount', 'r'),
            trigger: 'blur'
          },
          {
            message: this.mWords('amount', 'v'),
            validator: (rule, value, callback) => {
              // var reg = /^\d+(\.\d{1,2})?$/
              var reg = /^\d+$/
              if (!reg.test(value)) {
                // this.ruleForm.amount = ''
                callback(new Error(this.mWords('amount', 'v')))
                return
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    mWords(key, text) {
      return this.$util.mWords('formList.balanceWithdrawal', key, text)
    }
  }
}
</script>

<style lang="stylus" scoped>
.comInfoForm
  width 80%
  margin 0 auto
</style>
