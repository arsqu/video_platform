<template>
  <div id="comInfo">
    <h5 class="text-center">
      <!-- 4033 成功 4035 审核中 -->
      <template v-if="ruleForm.result === 1">
        <span class="tips">{{$t('statusCode.4035')}}</span>
      </template>
      <template v-else-if="ruleForm.result === 2">
        <span class="tips success">{{$t('statusCode.4033')}}</span>
      </template>
      <!-- <template v-else-if="ruleForm.result === 2">{{$t('statusCode.4033')}}</template> -->
    </h5>
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
      <input type="hidden" v-model="ruleForm.result" />
      <!-- 修改时 -->
      <input type="hidden" v-model="ruleForm.merchantId" />
      <a-form-model-item :label="mWords('companyName','l')" prop="companyName">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.companyName"
          :placeholder="mWords('companyName','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('regAddress','l')" prop="regAddress">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.regAddress"
          :placeholder="mWords('regAddress','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('phone','l')" prop="phone">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.phone"
          :placeholder="mWords('phone','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('createTime','l')" prop="createTime">
        <a-date-picker
          format="YYYY/MM/DD"
          :disabled="disabled"
          v-model="ruleForm.createTime"
          :placeholder="mWords('createTime','p')"
          style="width: 40%"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('allotedTime','l')" prop="allotedTime">
        <a-date-picker
          format="YYYY/MM/DD"
          :disabled="disabled"
          v-model="ruleForm.allotedTime"
          :placeholder="mWords('allotedTime','p')"
          style="width: 40%"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('businessScope','l')" prop="businessScope">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.businessScope"
          :placeholder="mWords('businessScope','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('bankInfo','l')" prop="bankInfo">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.bankInfo"
          :placeholder="mWords('bankInfo','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('bankAddress','l')" prop="bankAddress">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.bankAddress"
          :placeholder="mWords('bankAddress','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('bankNum','l')" prop="bankNum">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.bankNum"
          :placeholder="mWords('bankNum','p')"
        />
      </a-form-model-item>
      <a-form-model-item :label="mWords('bankCode','l')" prop="bankCode">
        <a-input
          type="text"
          :disabled="disabled"
          v-model="ruleForm.bankCode"
          :placeholder="mWords('bankCode','p')"
        />
      </a-form-model-item>
      <a-divider></a-divider>
    </a-form-model>
    <a-form-model
      ref="fileForm"
      layout="horizontal"
      :rules="fileRule"
      :model="fileForm"
      :wrapper-col="wrapperCol"
      :label-col="labelCol"
    >
      <a-form-model-item
        prop="businessLicense"
        :label="mWords('businessLicense','l')"
        :labelCol="formItemlabelCol"
        :wrapperCol="formItemwrapperCol"
      >
        <div class="clearfix link">
          <a-upload
            :beforeUpload="beforeUpload"
            :showUploadList="{showRemoveIcon:readonly}"
            :file-list="uploadConfig.businessLicense.fileList"
            @remove="(file)=>{handleRemove(file,'businessLicense')}"
            @preview="handlePreview"
            @change="(file,fileList)=>{handleChange(file,'businessLicense')}"
          >
            <a-button
              v-if="(ruleForm.result !== 1 && ruleForm.result !== 2) && uploadConfig.businessLicense.fileList.length < 1"
            >
              <a-icon type="upload" />
              {{this.$t('btnGroup.upload')}}
            </a-button>
          </a-upload>
        </div>
      </a-form-model-item>
      <a-form-model-item
        prop="contract"
        :label="mWords('contract','l')"
        :labelCol="formItemlabelCol"
        :wrapperCol="formItemwrapperCol"
      >
        <div class="clearfix link">
          <!-- @remove="(file)=>{handleRemove(file,'contract')}" -->
          <a-upload
            :beforeUpload="beforeUpload"
            :showUploadList="{showRemoveIcon:readonly}"
            multiple
            :file-list="uploadConfig.contract.fileList"
            @preview="handlePreview"
            @change="(file,fileList)=>{handleChange(file,'contract')}"
          >
            <a-button
              v-if="(ruleForm.result !== 1 && ruleForm.result !== 2) && uploadConfig.contract.fileList.length < 5"
            >
              <a-icon type="upload" />
              {{this.$t('btnGroup.upload')}}
            </a-button>
          </a-upload>
        </div>
      </a-form-model-item>
      <a-row>
        <a-form-model-item
          :labelCol="formItemlabelCol"
          :wrapperCol="formItemwrapperCol"
          :extra="$t('formList.comInfo.tips.image')"
        >
          <label
            :title="$t('formList.comInfo.idCard')"
            slot="label"
            class="ant-form-item-required"
          >{{$t('formList.comInfo.idCard')}}</label>
          <div class="clearfix inline-block mr-1">
            <a-form-model-item prop="cardFront" class="mb-0">
              <!-- @remove="(file)=>{handleRemove(file,'cardFront')}" -->
              <a-upload
                name="cardFront"
                list-type="picture-card"
                accept="image/*"
                :showUploadList="{showRemoveIcon:readonly}"
                :beforeUpload="beforeUpload"
                :file-list="uploadConfig.cardFront.fileList"
                @preview="handlePreview"
                @change="(file,fileList)=>{handleChange(file,'cardFront')}"
              >
                <div
                  v-if="(ruleForm.result !== 1 && ruleForm.result !== 2) && uploadConfig.cardFront.fileList.length < 1"
                >
                  <a-icon type="plus" />
                  <div class="ant-upload-text">{{mWords('cardFront','l')}}</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </div>
          <div class="clearfix inline-block">
            <a-form-model-item prop="cardBack" class="mb-0">
              <!-- @remove="(file)=>{handleRemove(file,'cardBack')}" -->
              <a-upload
                name="cardBack"
                list-type="picture-card"
                accept="image/*"
                :showUploadList="{showRemoveIcon:readonly}"
                :beforeUpload="beforeUpload"
                :file-list="uploadConfig.cardBack.fileList"
                @preview="handlePreview"
                @change="(file,fileList)=>{handleChange(file,'cardBack')}"
              >
                <div
                  v-if="(ruleForm.result !== 1 && ruleForm.result !== 2) && uploadConfig.cardBack.fileList.length < 1"
                >
                  <a-icon type="plus" />
                  <div class="ant-upload-text">{{mWords('cardBack','l')}}</div>
                </div>
              </a-upload>
            </a-form-model-item>
          </div>
        </a-form-model-item>
      </a-row>
      <a-form-model-item class="text-center" wrapperCol="{span: 24}">
        <a-button
          type="primary"
          :loading="loading"
          :disabled="disabled"
          @click="submitForm"
          style="width:150px"
        >{{this.$t('btnGroup.submit')}}</a-button>
      </a-form-model-item>
    </a-form-model>
    <!-- modal -->
    <a-modal class="covered" :visible="visible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export default {
  data() {
    return {
      visible: false,
      readonly: false,
      previewImage: '',
      disabled: false,
      loading: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      formItemlabelCol: { span: 6 },
      formItemwrapperCol: { span: 10 },
      // 图片上传配置
      uploadConfig: {
        businessLicense: {
          fileList: []
        },
        contract: {
          fileList: []
        },
        cardFront: {
          fileList: []
        },
        cardBack: {
          fileList: []
        }
      },
      method: null, // 请求方式
      // 信息表单
      ruleForm: {
        id: '',
        result: '',
        merchantId: '',
        companyName: '',
        regAddress: '',
        phone: '',
        createTime: null,
        allotedTime: null,
        businessScope: '',
        bankInfo: '',
        bankAddress: '',
        bankNum: '',
        bankCode: ''
      },
      // 资源表单
      fileForm: {
        businessLicense: '',
        contract: '',
        cardFront: '',
        cardBack: ''
      },
      fileRule: {
        businessLicense: [
          {
            required: true,
            message: this.mWords('businessLicense', 'r'),
            validator: this.fileValid,
            trigger: ['change', 'blur']
          }
        ],
        contract: [
          {
            required: true,
            message: this.mWords('contract', 'r'),
            validator: this.fileValid,
            trigger: ['change', 'blur']
          }
        ],
        cardFront: [
          {
            required: true,
            message: this.mWords('cardFront', 'r'),
            validator: this.fileValid,
            // 'change',
            trigger: ['blur']
          }
        ],
        cardBack: [
          {
            required: true,
            message: this.mWords('cardBack', 'r'),
            validator: this.fileValid,
            // 'change',
            trigger: ['blur']
          }
        ]
      },
      // validate rule
      rules: {
        companyName: [
          {
            required: true,
            message: this.mWords('companyName', 'r'),
            trigger: 'blur'
          }
        ],
        regAddress: [
          {
            required: true,
            message: this.mWords('regAddress', 'r'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.mWords('phone', 'r'),
            trigger: 'blur'
          }
        ],
        createTime: [
          {
            required: true,
            message: this.mWords('createTime', 'r'),
            trigger: 'change'
          }
        ],
        allotedTime: [
          {
            required: true,
            message: this.mWords('allotedTime', 'r'),
            trigger: 'change'
          }
        ],
        businessScope: [
          {
            required: true,
            message: this.mWords('businessScope', 'r'),
            trigger: 'blur'
          }
        ],
        bankInfo: [
          {
            required: true,
            message: this.mWords('bankInfo', 'r'),
            trigger: 'blur'
          }
        ],
        bankAddress: [
          {
            required: true,
            message: this.mWords('bankAddress', 'r'),
            trigger: 'blur'
          }
        ],
        bankNum: [
          {
            required: true,
            message: this.mWords('bankNum', 'r'),
            trigger: 'blur'
          }
        ],
        bankCode: [
          {
            required: true,
            message: this.mWords('bankCode', 'r'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    var condition = {
      condition: {}
    }
    // 公司信息
    this.$axios.postData('account.company.query', { condition }).then(res => {
      console.log(res)
      var step
      if (res.code === 200) {
        var data = res.data.records
        if (data.length > 0) {
          // 已存在一条记录时为修改,否则新增
          this.method = 1
          data = data[0] // 默认公司信息只允许存在一条
          // 审核状态 3通过
          if (data.result === 1 || data.result === 2) {
            this.disabled = true
          }
          for (var k in data) {
            if (!data[k]) {
              step = -1 // 有一项为空则无法添加应用
              break
            }
          }
          // 公司信息完整则进入申请app页,个人信息跳转则保留在信息页
          if (!this.$route.query.type) {
            if (step !== -1) {
              this.setStep(1)
              return
            }
          }
          console.log('赋值')
          data = this.doSame(data)
          if (data.result === 1 || data.result === 2) {
            this.readonly = false
          }
          console.log(this.readonly)
          this.ruleForm = data
        }
      }
    })
  },
  methods: {
    ...mapActions(['setStep']),
    doSame(data) {
      var match = {
        1: 'cardFront',
        2: 'cardBack',
        3: 'businessLicense',
        4: 'contract'
      }
      data = Object.assign({}, data)
      // picker组件需要接收moment对象
      data.createTime = data.createTime ? moment(data.createTime) : null
      data.allotedTime = data.allotedTime ? moment(data.allotedTime) : null
      if (data.files.length > 0) {
        var key
        data.files.map(res => {
          key = match[res.type]
          if (key) {
            var reg = /(?:.*\/)*([^.]+)(.*)/
            if (res.fileUrl) {
              this.fileForm[key] = res
              res.fileUrl = res.fileUrl.split(',')
              var showFile = res.fileUrl.map(file => {
                return {
                  uid: res.id,
                  name: file.match(reg)[1] + file.match(reg)[2],
                  url: file
                }
              })
              this.uploadConfig[key].fileList = showFile
            }
          }
        })
      }
      return data
    },
    // 校验文件是否为空
    fileValid(rule, value, callback) {
      console.log(rule, value)
      if (!value) {
        callback(1)
        return
      }
      callback()
    },
    // 禁止自动上传
    beforeUpload() {
      return false
    },
    // 匹配对应语言
    mWords(key, text) {
      var s = 'comInfo'
      return this.$util.mWords('formList.' + s, key, text)
    },
    // 页面上删除
    handleRemove(file, key) {
      return false
      // var fileList = this.uploadConfig[key].fileList
      // const index = fileList.indexOf(file)
      // const newFileList = fileList.slice()
      // newFileList.splice(index, 1)
      // this.uploadConfig[key].fileList = newFileList
    },
    handleCancel() {
      this.visible = false
    },
    // 图片改变后的回调
    handleChange({ file, fileList }, key) {
      var imgRule = ['cardFront', 'cardBack']
      var imgType = ['image/jpeg', 'image/png', 'image/webp']
      var isUpload = true
      if (imgRule.indexOf(key) !== -1) {
        isUpload = imgType.indexOf(file.type)
        if (isUpload === -1) {
          this.$util.Message('warning', this.$t('formList.comInfo.tips.image'))
          return false
        }
      }
      this.uploadConfig[key].fileList = fileList
      // this.ruleForm[key] = fileList
      this.fileForm[key] = fileList
    },
    // 创建下载链接
    createLink(url, name) {
      var link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)
      document.body.appendChild(link)
      link.click()
      console.log(link)
      document.body.removeChild(link)
    },
    // 预览图
    async handlePreview(file) {
      var viewType = ['jpeg', 'png', 'jpg', 'webp']
      var s = file.name.split('.')
      var suffix = s[s.length - 1]
      if (viewType.indexOf(suffix) === -1) {
        console.log('非图片类型')
        // this.createLink(file.url, file.name)
        window.open(file.url)
        return
      }
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
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
    // 资源文件验证
    validFileForm() {
      return new Promise((resolve, reject) => {
        this.$refs.fileForm.validate(valid => {
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
          formdata.append(file, detl[i].originFileObj)
        }
      }
      return formdata
    },
    postInfo(type) {
      var formdata = new FormData()
      var v = this.ruleForm
      var f = this.fileForm
      if (v.result === 1 || v.result === 2) {
        console.log('审核已通过禁止修改')
        return
      }
      v = Object.assign({}, v)
      v.createTime = new Date(v.createTime).getTime()
      v.allotedTime = new Date(v.allotedTime).getTime()
      var key
      console.log(f)
      console.log(v)
      if (type) {
        v.companyId = v.id // 修改时传入公司id
        key = 'edit'
      } else {
        key = 'save'
        delete v.merchantId
      }
      delete v.id
      delete v.result
      for (var k in v) {
        formdata.append(k, v[k])
      }
      f = this.getFile(f, formdata)
      this.loading = true
      this.$axios
        .postFile('account.company.' + key, formdata)
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.loading = false
            this.$util.Message('success', this.$t('formList.common.' + key))
            console.log('成功')
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    },
    async submitForm(e) {
      var valid = await this.validForm() // 表单
      var fileValid = await this.validFileForm() // 文件
      if (valid && fileValid) {
        // if (valid) {
        console.log('可以提交')
        // 真代表已存在为编辑信息,否则为添加信息
        var method = this.method
        console.log(method)
        // return
        this.postInfo(method)
      }
    }
  }
}
</script>

<style style="stylus" scoped>
</style>
