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
      <a-form-model-item :label="mWords('sysKey', 'l')" prop="sysKey">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.sysKey"
          :placeholder="mWords('sysKey', 'p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('rate', 'l')" prop="rate">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.rate"
          :placeholder="mWords('rate', 'p')"
        />
      </a-form-model-item>
      <a-divider></a-divider>
      <div class="tips_message">请输入远程地址或上传本地文件</div>
      <!-- <div class="tips_message">支持上传文件或输入远程地址,上传优先级最高</div> -->
      <a-form-model-item
        prop="sysFirstValue"
        :label="mWords('sysFirstValue', 'l')"
        :labelCol="formItemlabelCol"
        :wrapperCol="formItemwrapperCol"
      >
        <div class="clearfix link">
          <a-input v-model="ruleForm.sysFirstValue"></a-input>
          <a-upload
            list-type="picture-card"
            accept="image/*"
            :beforeUpload="
              _ => {
                return false
              }
            "
            :showUploadList="{ showRemoveIcon: readonly }"
            :file-list="uploadConfig.sysFirstValue.fileList"
            @preview="
              file => {
                handlePreview(file, 'sysFirstValue')
              }
            "
            @change="
              (file, fileList) => {
                handleChange(file, 'sysFirstValue')
              }
            "
          >
            <div v-if="uploadConfig.sysFirstValue.fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">选择图片</div>
            </div>
          </a-upload>
        </div>
      </a-form-model-item>
      <a-form-model-item
        prop="sysValue"
        :label="mWords('sysValue', 'l')"
        :labelCol="formItemlabelCol"
        :wrapperCol="formItemwrapperCol"
      >
        <div class="clearfix link">
          <a-input v-model="ruleForm.sysValue"></a-input>
          <a-upload
            :beforeUpload="
              _ => {
                return false
              }
            "
            :showUploadList="{ showRemoveIcon: readonly }"
            :file-list="uploadConfig.sysValue.fileList"
            @preview="
              file => {
                handlePreview(file, 'sysValue')
              }
            "
            @change="
              (file, fileList) => {
                handleChange(file, 'sysValue')
              }
            "
          >
            <a-button v-if="uploadConfig.sysValue.fileList.length < 1">
              <a-icon type="upload" />
              {{ this.$t('btnGroup.file.svga') }}
            </a-button>
          </a-upload>
        </div>
      </a-form-model-item>
      <a-form-model-item :label="mWords('result', 'l')" prop="result">
        <!--  -->
        <a-switch
          :default-checked="ruleForm.result"
          checked-children="开"
          un-checked-children="关"
          @change="
            v => {
              this.ruleForm.result = +v
            }
          "
        />
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
      :bodyStyle="{ textAlign: 'center' }"
      :footer="null"
      @cancel="visible = false"
    >
      <img style="max-width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
        sysFirstValue: {
          fileList: []
        },
        sysValue: {
          fileList: []
        }
      },
      method: null, // 请求方式
      // 资源表单
      fileForm: {
        sysValue: undefined,
        sysFirstValue: undefined
      },
      rules: {
        sysKey: [
          {
            required: true,
            message: this.mWords('sysKey', 'r'),
            trigger: 'blur'
          }
        ],
        rate: [
          {
            required: true,
            message: this.mWords('rate', 'r'),
            trigger: 'blur'
          }
        ],
        sysValue: [
          {
            required: true,
            message: this.mWords('sysValue', 'r'),
            validator: this.fileValid,
            trigger: ['change', 'blur']
          }
        ],
        sysFirstValue: [
          {
            required: true,
            message: this.mWords('sysFirstValue', 'r'),
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
  computed: {
    ...mapGetters(['getSvgLoad'])
  },
  methods: {
    doSame(k) {
      var match = ['sysFirstValue', 'sysValue']
      match.map((key, idx) => {
        var obj = {
          uid: idx,
          name: this.ruleForm[key],
          url: this.ruleForm[key]
        }
        // 预览图的显示规则
        this.fileForm[key] = [this.ruleForm[key]]
        this.uploadConfig[key].fileList = [obj]
      })
    },
    // 校验文件是否为空
    fileValid(rule, value, callback) {
      var key = rule.field
      if (!value && !this.fileForm[key]) {
        callback(1)
        return
      }
      callback()
    },
    // 匹配对应语言
    mWords(key, text) {
      return this.$util.mWords('control.gifts.defForm', key, text)
    },
    // 图片改变后的回调
    handleChange({ file, fileList }, key) {
      if (file.status === 'removed') {
        this.uploadConfig[key].fileList = []
        this.fileForm[key] = null
        return
      }
      var imgType = ['image/jpeg', 'image/png', 'image/webp']
      var isUpload = null
      var s = file.name.split('.')
      var suffix = s[s.length - 1]
      isUpload = imgType.indexOf(file.type)
      if (key === 'sysValue') {
        if (suffix !== 'svga') {
          this.$util.Message('warning', this.$t('tips.valid.svga'))
          return
        }
      } else {
        if (isUpload === -1) {
          this.$util.Message('warning', this.$t('tips.valid.image'))
          return
        }
      }
      console.log(fileList)
      this.uploadConfig[key].fileList = fileList
      this.fileForm[key] = fileList
    },
    // 预览图
    async handlePreview(file, key) {
      var viewType = ['jpeg', 'png', 'jpg', 'webp']
      var s = file.name.split('.')
      var suffix = s[s.length - 1]
      // svga动图预览
      if (key === 'sysValue') {
        var preview
        var baseView = 0
        if (file.originFileObj) {
          preview = await this.$util.getBase64(file.originFileObj)
          var idx = preview.indexOf('base64,')
          preview = preview.slice(idx + 7)
          baseView = 1
        }
        var url = file.url || 'data:svga/2.0;base64,' + preview
        this.$Modal.info({
          title: 'SVGA预览',
          icon: '',
          maskClosable: true,
          content: h => (
            <div>
              <span>Tips:如地址正确无法播放动画可能因为跨域被浏览器拒绝</span>
              <a-spin class="mt-1" spinning={this.getSvgLoad}>
                <div
                  class="mt-1"
                  v-svga={url}
                  data-Base={baseView}
                  style={{
                    height: window.innerHeight * 0.6 + 'px'
                  }}
                ></div>
              </a-spin>
            </div>
          )
        })
        return
      } else {
        if (viewType.indexOf(suffix) === -1) {
          console.log('提示')
          this.$util.Message(
            'warning',
            '表单中只支持 jpeg,png,jpg,webp 格式的预览'
          )
          return
        } else {
        }
      }
      // 网络地址或远程地址
      if (!file.url && !file.preview) {
        file.preview = await this.$util.getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.visible = true
    },
    // 表单验证
    validForm() {
      return new Promise((resolve, reject) => {
        console.log('表单校验')
        this.$refs.ruleForm.validate(valid => {
          console.log(valid)
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
        if (!detl) {
          continue
        }
        for (var i = 0; i < detl.length; i++) {
          if (detl[i].originFileObj) {
            formdata.delete(file)
            formdata.append(file, detl[i].originFileObj)
          }
        }
      }
    },
    postInfo() {
      var formdata = new FormData()
      console.log('提交')
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
      this.getFile(f, formdata)
      this.loading = true
      this.$axios
        .postFile('control.gifts.' + key, formdata)
        .then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.loading = false
              this.$util.Message('success', '提交成功')
              this.$emit('refreshTable')
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
      console.log('post')
      var valid = await this.validForm() // 表单
      console.log(valid)
      if (valid) {
        console.log('可以提交')
        this.postInfo()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.tips_message
  color #ee5252
  text-align center
  margin-bottom 15px
</style>
