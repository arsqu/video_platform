<template>
  <div class="login">
    <div class="header">
      <a :href="this.$util.getPublicPath()" class="web_logo"></a>
      <router-link :to="{name:'signin'}" class="login_btn ant-btn">{{$t('btnGroup.signin')}}</router-link>
      <!-- <a-button shape="round" class="login_btn">{{$t('btnGroup.signin')}}</a-button> -->
    </div>
    <div class="section">
      <div class="sign_box">
        <h3 class="sign_desc">{{$t('btnGroup.signup')}}</h3>
        <a-form-model
          ref="ruleForm"
          layout="vertical"
          :model="ruleForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item :label="mWords('account','l')" prop="account">
            <a-input size="large" v-model="ruleForm.account" :placeholder="mWords('account','p')" />
          </a-form-model-item>
          <a-form-model-item :label="mWords('email','l')" prop="email">
            <a-input-search
              size="large"
              :placeholder="mWords('email','p')"
              v-model="ruleForm.email"
            >
              <a-button
                slot="enterButton"
                type="primary"
                :class="{valid:showTime}"
                @click.native="getMail"
                :disabled="showTime"
              >
                <span v-show="showEmail">{{$t('signup.form.sendCode')}}</span>
                <span v-show="showTime">{{timeLast}}</span>
              </a-button>
              <!-- <a-button slot="enterButton" @click.native="sendCode">{{$t('signup.form.sendCode')}}</a-button> -->
            </a-input-search>
          </a-form-model-item>
          <a-form-model-item :label="mWords('code','l')" prop="code">
            <a-input size="large" v-model="ruleForm.code" :placeholder="mWords('code','p')" />
          </a-form-model-item>
          <a-form-model-item class="form-item-password" :label="mWords('pwd','l')" prop="pwd">
            <!-- <template slot="extra">
              <a-tooltip>
                {{$t('signup.form.pwd.tips.descTxt')}}
                <template slot="title">
                  <span v-html="$t('signup.form.pwd.tips.desc')"></span>
                </template>
              </a-tooltip>
            </template>-->
            <a-input
              size="large"
              type="password"
              v-model="ruleForm.pwd"
              :placeholder="mWords('pwd','p')"
            />
          </a-form-model-item>
          <a-form-model-item :label="mWords('rPwd','l')" prop="verifyPassword">
            <a-input
              size="large"
              type="password"
              v-model="ruleForm.verifyPassword"
              :placeholder="mWords('rPwd','p')"
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-checkbox v-model="checked">
              <!-- @click="viewInfo" -->
              <!-- <span>{{$t('signup.form.notice')}}</span> -->
              <span @click="viewInfo" v-html="$t('signup.form.notice')"></span>
              <!-- <span @click="viewInfo" v-html="$t('signup.form.notice')"></span> -->
            </a-checkbox>
          </a-form-model-item>
          <a-form-model-item align="center">
            <a-button
              block
              type="primary"
              size="large"
              :loading="loading"
              :disabled="!checked"
              @click="submitForm('ruleForm')"
            >{{$t('signup.form.btnTxt')}}</a-button>
            <!-- <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">Reset</a-button> -->
          </a-form-model-item>
          <a-form-model-item class="mt-0" align="center">
            <!-- <a href="/open/signin.html">{{$t('btnGroup.signin')}}</a> -->
            <router-link tag="a" :to="{name:'signin'}">{{$t('btnGroup.signin')}}</router-link>
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
      checked: false,
      // form-model
      ruleForm: {
        email: '',
        code: '',
        account: '',
        pwd: '',
        verifyPassword: ''
      },
      timer: null, // 定时器
      loading: false,
      showEmail: true,
      showTime: false,
      timeLast: '', // 剩余时间
      // validate rule
      // ,asyncValidator: (rule, value) => {
      //   return new Promise((resolve, reject) => {
      //     console.log(rule, value)
      //     if (value < 18) {
      //       reject(new Error(false))
      //     } else {
      //       resolve()
      //     }
      //   })
      // }
      rules: {
        email: [
          {
            required: true,
            message: this.mWords('email', 'r'),
            trigger: 'blur'
          },
          {
            message: this.mWords('email', 'v'),
            type: 'email',
            trigger: 'blur'
          }
        ],
        account: [
          {
            required: true,
            trigger: 'blur',
            message: this.mWords('account', 'r')
          }
        ],
        code: [
          {
            required: true,
            message: this.mWords('code', 'r'),
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: this.mWords('pwd', 'r'),
            trigger: 'blur'
          },
          {
            validator: this.validPwd,
            message: this.mWords('pwd', 'v'),
            trigger: 'blur'
          }
        ],
        verifyPassword: [
          {
            required: true,
            message: this.mWords('rPwd', 'r'),
            trigger: 'blur'
          },
          {
            validator: this.secValid,
            message: this.mWords('rPwd', 'v'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    mWords(key, type) {
      return this.$util.mWords('signup.form', key, type)
    },
    stopTimer() {
      this.timer && clearInterval(this.timer)
      this.timer = null
      this.timeLast = ''
      this.showEmail = true
      this.showTime = false
    },
    viewInfo() {
      this.$util.Message(this.$t('common.construction'))
    },
    // 倒计时
    countdown() {
      var time = 60
      this.showEmail = false
      this.showTime = true
      this.timer && clearInterval(this.timer)
      this.timeLast = time + 's'
      this.timer = setInterval(_ => {
        time--
        this.timeLast = time + 's'
        if (time === -1) {
          this.stopTimer()
        }
      }, 1000)
    },
    // 获取验证码
    getCode(v) {
      this.$util.Message(this.$t('signup.tips.sendCode'))
      this.countdown() // 开始倒计时
      this.$axios
        .postData('open.register.sendMail', { email: v })
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            // this.$util.Message('destroy')
            // 不需要知道是否收到邮件
            // this.$util.Message('success', '发送成功')
          } else {
            this.stopTimer()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 邮箱验证码
    getMail() {
      var v = this.ruleForm.email
      var reg = /^.+@.+\..+/ // async-validate 邮箱正则
      if (!reg.test(v)) {
        console.log('校验失败不提交')
        return
      }
      if (this.showTime) {
        console.log('倒计时中,无法点击')
        return
      }
      this.getCode(v)
    },
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
    async submitForm() {
      var valid = await this.validForm()
      if (valid) {
        this.loading = true
        this.$axios
          .postData('open.register.toRegister', this.ruleForm)
          .then(res => {
            console.log(res)
            this.loading = false
            if (res.code === 200) {
              this.$util.Message('success', this.$t('signup.tips.regsuccess'))
              setTimeout(_ => {
                this.$router.push({ name: 'signin' })
              }, 300)
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
          })
      }
    },
    // 验证密码
    validPwd(rule, value, callback) {
      if (value === '') {
        callback(new Error(false))
      } else {
        if (this.ruleForm.verifyPassword !== '') {
          this.$refs.ruleForm.validateField('verifyPassword')
        }
        callback()
      }
    },
    // 二次校验密码
    secValid(rule, value, callback) {
      if (value === '') {
        callback(new Error(false))
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error(false))
      } else {
        callback()
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
.login
  width 100%
.header
  position absolute
  font-size 0
  top 0
  width 100%
  max-width 1190px
  margin auto
  left 0
  right 0
  z-index 2
  a
    margin 15px 32px
  .web_logo
    display inline-block
    width 124px
    height 53px
    //background url('/static/image/logo.png') 0 0 / 124px 53px
    //background-image url('/static/image/logo.png'), none
    background url('~@assets/image/logo.png') 0 0 / 124px 53px
    background-image url('~@assets/image/logo.png'), none
  .login_btn
    background 0 0
    color #1781B2
    height 32px
    padding 0 16px
    font-size 14px
    border-radius 32px
    border-color #1781B2
    position absolute
    right 0
    top 0
    &:hover
      color #253B80
      border-color #253B80
.section
  .sign_box
    position relative
    color #20123b
    max-width 480px
    background-color #fff
    background #fff
    border-radius 16px
    -webkit-box-shadow 0 2px 8px 0 rgba(0, 0, 0, .16)
    box-shadow 0 2px 8px 0 rgba(0, 0, 0, .16)
    margin 63px auto
    padding 50px 40px 20px
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
