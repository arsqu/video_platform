<template>
  <div id="comInfo">
    <a-form-model
      ref="ruleForm"
      layout="horizontal"
      :rules="rules"
      :model="ruleForm"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <!-- 原始id -->
      <input type="hidden" v-model="ruleForm.id" />
      <a-form-model-item :label="mWords('oldVersion', 'l')" prop="oldVersion">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.oldVersion"
          :placeholder="mWords('oldVersion', 'p')"
        />
      </a-form-model-item>
      <a-form-model-item
        :label="mWords('lowestVersion', 'l')"
        prop="lowestVersion"
      >
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.lowestVersion"
          :placeholder="mWords('lowestVersion', 'p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('newVersion', 'l')" prop="newVersion">
        <a-input
          type="text"
          :disabled="disabled"
          :placeholder="mWords('newVersion', 'p')"
          v-model="ruleForm.newVersion"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('forcibly', 'l')" prop="forcibly">
        <a-select
          style="width:120px"
          :placeholder="mWords('forcibly', 'l')"
          v-model="ruleForm.forcibly"
        >
          <a-select-option
            v-for="(item, idx) in $t('mapConfig.control.upload.forcibly')"
            :key="idx"
            :value="idx"
            >{{ item }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item :label="mWords('content', 'l')" prop="content">
        <a-input
          type="textarea"
          :disabled="disabled"
          v-model="ruleForm.content"
          :placeholder="mWords('content', 'p')"
        />
      </a-form-model-item>
      <a-divider />
      <a-form-model-item
        prop="apkUrl"
        :label="mWords('apkUrl', 'l')"
        :labelCol="formItemlabelCol"
        :wrapperCol="formItemwrapperCol"
      >
        <div class="clearfix link">
          <a-upload
            :beforeUpload="
              _ => {
                return false
              }
            "
            :showUploadList="{ showRemoveIcon: readonly }"
            :file-list="uploadConfig.apkUrl.fileList"
            @preview="handlePreview"
            @change="
              (file, fileList) => {
                handleChange(file, 'apkUrl')
              }
            "
          >
            <a-button v-if="uploadConfig.apkUrl.fileList.length < 1">
              <a-icon type="upload" />
              {{ this.$t('btnGroup.upload') }}
            </a-button>
          </a-upload>
        </div>
      </a-form-model-item>
      <a-form-model-item class="text-center" wrapperCol="{span: 24}">
        <a-button
          type="primary"
          :loading="loading"
          :disabled="disabled"
          @click="submitForm"
          style="width:150px"
          >{{ this.$t('btnGroup.submit') }}</a-button
        >
      </a-form-model-item>
    </a-form-model>
    <!-- modal -->
    <a-modal
      class="covered"
      :visible="visible"
      :footer="null"
      @cancel="visible = false"
    >
      <img style="max-width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    postState: Number,
    isEdit: Boolean,
    ruleForm: Object
  },
  data() {
    return {
      visible: false,
      readonly: true,
      previewImage: '',
      disabled: false,
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formItemlabelCol: { span: 6 },
      formItemwrapperCol: { span: 10 },
      // 图片上传配置
      uploadConfig: {
        apkUrl: {
          fileList: []
        }
      },
      method: null, // 请求方式
      // 资源表单
      fileForm: {
        apkUrl: undefined
      },
      // validate rule
      rules: {
        oldVersion: [
          {
            required: true,
            message: this.mWords('oldVersion', 'r'),
            trigger: 'blur'
          }
        ],
        forcibly: [
          {
            required: true,
            message: this.mWords('forcibly', 'r'),
            trigger: 'change'
          }
        ],
        apkUrl: [
          {
            required: true,
            message: this.mWords('apkUrl', 'r'),
            validator: this.fileValid,
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  mounted() {
    console.log(this.ruleForm)
    if (!this.postState) {
      this.doSame()
    }
  },
  methods: {
    doSame(data) {
      var match = ['apkUrl']
      match.map((key, idx) => {
        var obj = {
          uid: idx,
          name: this.ruleForm[key],
          url: this.ruleForm[key]
        }
        console.log(obj)
        this.fileForm[key] = [this.ruleForm[key]]
        this.uploadConfig[key].fileList = [obj]
      })
    },
    // 校验文件是否为空
    fileValid(rule, value, callback) {
      console.log(rule, value)
      var key = rule.field
      if (!value && !this.fileForm[key]) {
        callback(1)
        return
      } else if (key === 'apkUrl') {
        if (
          !value &&
          (!this.fileForm[key] || this.fileForm[key].length === 0)
        ) {
          this.$util.Message('warning', this.$t('tips.valid.svga'))
          callback(1)
          return
        }
      } else {
      }
      callback()
    },
    // 匹配对应语言
    mWords(key, text) {
      return this.$util.mWords('control.upload.defForm', key, text)
    },
    // 页面上删除
    handleRemove(file, key) {
      this.uploadConfig[key].fileList = []
      this.fileForm[key] = null
      return false
    },
    // 图片改变后的回调
    handleChange({ file, fileList }, key) {
      if (file.status === 'removed') {
        this.uploadConfig[key].fileList = []
        this.fileForm[key] = null
        return
      }
      var imgType = ['application/vnd.android.package-archive']
      var isUpload = true
      var s = file.name.split('.')
      var suffix = s[s.length - 1]
      isUpload = imgType.indexOf(file.type)
      if (isUpload === -1 && suffix !== 'apk') {
        this.$util.Message('warning', '请确认上传文件为apk')
        return false
      }
      this.uploadConfig[key].fileList = fileList
      this.fileForm[key] = fileList
    },
    // 预览图
    async handlePreview(file) {
      var viewType = ['jpeg', 'png', 'jpg', 'webp']
      var s = file.name.split('.')
      var suffix = s[s.length - 1]
      if (viewType.indexOf(suffix) === -1) {
        this.$util.Message('warning', 'svga图请在表格中预览')
        return
      }
      if (!file.url && !file.preview) {
        file.preview = await this.$util.getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.visible = true
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
    getFile(f, formdata) {
      for (var file in f) {
        var detl = f[file]
        for (var i = 0; i < detl.length; i++) {
          if (file === 'apkUrl') {
            file = 'apk'
          }
          formdata.append(file, detl[i].originFileObj)
        }
      }
      return formdata
    },
    postInfo() {
      var formdata = new FormData()
      var type = this.postState
      var v = this.ruleForm
      var f = this.fileForm
      v = Object.assign({}, v)
      var key
      console.log(f)
      console.log(v)
      if (type) {
        key = 'save'
        delete v.id
      } else {
        key = 'upd'
      }
      for (var k in v) {
        formdata.append(k, v[k])
      }
      f = this.getFile(f, formdata)
      this.loading = true
      // , { timeout: 50000 }
      this.$axios
        .postFile('control.upload.' + key, formdata)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.loading = false
              this.$util.Message('success', '提交成功')
              setTimeout(_ => {
                this.$router.go(0)
              }, 1000)
              console.log('成功')
            } else {
              this.$util.Message('error', '提交失败')
            }
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    async submitForm(e) {
      var valid = await this.validForm() // 表单
      if (valid) {
        // if (valid) {
        console.log('可以提交')
        this.postInfo()
      }
    }
  }
}
</script>

<style style="stylus" scoped></style>
