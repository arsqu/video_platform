<template>
  <a-form-model ref="ruleForm" layout="vertical" :rules="rules" :model="ruleForm">
    <input type="hidden" v-model="ruleForm.id" />
    <input type="hidden" v-model="ruleForm.mchId" />
    <a-form-model-item :label="mWords('appName','l')" prop="appName">
      <a-input
        size="large"
        disabled
        v-model="ruleForm.appName"
        :placeholder="mWords('appName','p')"
      />
    </a-form-model-item>
    <a-form-model-item :label="mWords('appTyp','l')" prop="appTyp">
      <a-select size="large" disabled v-model="ruleForm.appTyp">
        <a-select-option
          v-for="(item,idx) in $t('mapConfig.account.appTyp')"
          :key="idx"
          :value="+idx"
        >{{item}}</a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :label="mWords('signKey','l')" prop="signKey">
      <a-input
        type="text"
        disabled
        size="large"
        v-model="ruleForm.signKey"
        :placeholder="mWords('signKey','p')"
      />
    </a-form-model-item>
    <a-form-model-item :label="mWords('syncUrl','l')" prop="syncUrl">
      <a-input
        type="text"
        disabled
        size="large"
        v-model="ruleForm.syncUrl"
        :placeholder="mWords('syncUrl','p')"
      />
    </a-form-model-item>
    <a-form-model-item :label="mWords('countryList','l')" prop="countryList">
      <a-input
        type="textarea"
        size="large"
        v-model="ruleForm.countryList"
        :placeholder="mWords('countryList','p')"
      />
    </a-form-model-item>
    <a-form-model-item :label="mWords('ipList','l')" prop="ipList">
      <a-input
        type="textarea"
        size="large"
        v-model="ruleForm.ipList"
        :placeholder="mWords('ipList','p')"
      />
    </a-form-model-item>
    <!-- <a-form-model-item :label="mWords('ad','l')">
      <a-input
        type="text"
        disabled
        size="large"
        v-model="ruleForm.ad"
        :placeholder="mWords('ad','p')"
      />
    </a-form-model-item> -->
    <a-form-model-item class="text-center">
      <slot name="footer" :ruleForm="this.ruleForm"></slot>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    ruleForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  mounted() {
    // this.mapConfig = {
    //   appTyp: this.$t('mapConfig.account.appTyp')
    // }
  },
  data() {
    return {
      mapConfig: {},
      rules: {
        // appName: [
        //   {
        //     required: true,
        //     message: this.mWords('appName', 'r'),
        //     trigger: 'blur'
        //   }
        // ],
        // appTyp: [
        //   {
        //     required: true,
        //     message: this.mWords('appTyp', 'r'),
        //     trigger: 'blur'
        //   }
        // ],
        // signKey: [
        //   {
        //     required: true,
        //     message: this.mWords('signKey', 'r'),
        //     trigger: 'blur'
        //   }
        // ],
        // syncUrl: [
        //   {
        //     required: true,
        //     message: this.mWords('syncUrl', 'r'),
        //     trigger: 'blur'
        //   }
        // ],
        // countryList: [
        //   {
        //     required: true,
        //     message: this.mWords('countryList', 'r'),
        //     trigger: 'blur'
        //   }
        // ],
        // ipList: [
        //   {
        //     required: true,
        //     message: this.mWords('ipList', 'r'),
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  methods: {
    mWords(key, text) {
      return this.$util.mWords('formList.applyApp', key, text)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
