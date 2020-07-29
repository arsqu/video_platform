<template>
  <div class="register">
    <div class="section">
      <div class="sign_box">
        <div class="header">
          <a :href="publicPath" class="web_logo"></a>
        </div>
        <a-form-model
          ref="ruleForm"
          layout="vertical"
          :model="ruleForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @keyup.native.enter="submitForm"
        >
          <a-form-model-item :label="mWords('identity','l')" prop="identity">
            <a-input
              size="large"
              type="text"
              v-model="ruleForm.identity"
              :placeholder="mWords('identity','p')"
            />
          </a-form-model-item>
          <a-form-model-item class="form-item-password" :label="mWords('pwd','l')" prop="pwd">
            <a-input
              size="large"
              type="password"
              v-model="ruleForm.pwd"
              :placeholder="mWords('pwd','p')"
            />
          </a-form-model-item>
          <a-form-model-item align="center">
            <a-button
              block
              type="primary"
              :loading="loading"
              size="large"
              @click="submitForm"
            >{{$t('btnGroup.signin')}}</a-button>
            <!-- <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">Reset</a-button> -->
          </a-form-model-item>
          <!-- <a-divider /> -->
          <a-divider>or</a-divider>
          <a-form-model-item class="mb-0" align="center">
            <router-link tag="a" :to="{name:'signup'}">{{$t('btnGroup.signup')}}</router-link>
            <!-- <a href="/open/signup.html">{{$t('btnGroup.signup')}}</a> -->
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // form-model
      ruleForm: {
        identity: '',
        // email: '',
        pwd: ''
      },
      publicPath: '',
      loading: false,
      // validate rule
      rules: {
        identity: [
          {
            required: true,
            message: this.mWords('identity', 'r'),
            trigger: 'blur'
          }
          // {
          //   message: this.mWords('identity', 'v'),
          //   type: 'email',
          //   trigger: 'blur'
          // }
        ],
        pwd: [
          {
            required: true,
            message: this.mWords('pwd', 'r'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.publicPath = this.$util.getPublicPath()
  },
  mounted() {},
  methods: {
    mWords(key, text) {
      return this.$util.mWords('login.form', key, text)
    },
    // 表单校验
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
    async submitForm() {
      var valid = await this.validForm()
      if (valid) {
        this.loading = true
        var id = this.ruleForm.identity
        var k
        if (id.indexOf('@') !== -1) {
          k = 'email'
        } else {
          k = 'account'
        }
        var opt = Object.assign({}, this.ruleForm)
        opt[k] = id
        delete opt.identity
        this.$axios
          .postData('open.login', opt)
          .then(res => {
            console.log(res)
            this.loading = false
            if (res.code === 200) {
              this.$util.Message('destroy')
              this.$util.Message('success', this.$t('login.tips.logsuccess'))
              var data = res.data
              if (data) {
                localStorage.setItem('userInfo', JSON.stringify(data))
                localStorage.setItem('token', data.token)
                var path = sessionStorage.getItem('path')
                setTimeout(_ => {
                  console.log(this.publicPath)
                  if (!path || path === '/') {
                    path = 'account.html'
                    location.href = this.publicPath + path
                  } else {
                    location.href = path
                  }
                  sessionStorage.clearItem('path')
                }, 300)
              }
              console.log(data)
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="stylus">
//覆盖全局样式
body
  background #FBFBFE
  height auto
</style>

<style lang="stylus" scoped>
.register
  width 100%
  & >>> .ant-divider-inner-text
    color #6c7378
    font-weight normal
.header
  position absolute
  font-size 0
  top 0
  width 100%
  //max-width 1190px
  text-align center
  margin auto
  left 0
  right 0
  z-index 2
  a
    margin 20px 32px
  .web_logo
    display inline-block
    width 124px
    height 53px
    background url('~@assets/image/logo.png') 0 0 / 124px 53px
    background-image url('~@assets/image/logo.png'), none
  .login_btn
    background 0 0
    color #1781B2
    border-color #1781B2
    position absolute
    right 0
    top 0
    &:hover
      color #253B80
      border-color #253B80
.section
  .sign_box
    margin 100px auto
    position relative
    margin-left auto
    color #20123b
    margin-right auto
    max-width 480px
    background-color #fff
    background #fff
    border-radius 16px
    -webkit-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .16)
    box-shadow 0 2px 8px 0 rgba(0, 0, 0, .16)
    padding 93px 40px 15px
    .form-item-password >>> .ant-form-extra
      position absolute
      top 0
      right 0
      padding 0
      line-height 32px
      margin-top -32px
      color #108ee9
    .sign_desc
      text-align center
      font-size 23px
</style>
