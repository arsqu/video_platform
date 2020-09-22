<template>
  <div class="register">
    <div class="section">
      <div class="sign_box">
        <a-row class="login_form">
          <a-col class="pr-7 login_img" :xs="0" :md="12">
            <img src="~@assets/image/logo_pic.png" alt="" />
          </a-col>
          <a-col class="pl-7 login_box" :xs="24" :md="12">
            <div class="login_text mb-md-7">视频后台管理</div>
            <a-form-model
              ref="ruleForm"
              layout="vertical"
              :model="ruleForm"
              :rules="rules"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              @keyup.native.enter="submitForm"
            >
              <!-- :label="mWords('identity', 'l')" -->
              <a-form-model-item prop="identity">
                <a-input
                  size="large"
                  type="text"
                  autocomplete="username"
                  v-model="ruleForm.identity"
                  :placeholder="mWords('identity', 'p')"
                >
                  <a-icon slot="suffix" type="user" />
                </a-input>
              </a-form-model-item>
              <!-- :label="mWords('pwd', 'l')" -->
              <a-form-model-item class="form-item-password" prop="password">
                <!-- a-input-password -->
                <a-input
                  size="large"
                  type="password"
                  autocomplete="current-password"
                  v-model="ruleForm.password"
                  :placeholder="mWords('pwd', 'p')"
                >
                  <a-icon slot="suffix" type="lock" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item align="center" class="mt-md-9">
                <a-button
                  block
                  type="primary"
                  :loading="loading"
                  size="large"
                  @click="submitForm"
                  >{{ $t('btnGroup.signin') }}</a-button
                >
              </a-form-model-item>
              <!-- <a-divider /> -->
              <!-- <a-form-model-item class="mb-0" align="center">
            <router-link tag="a" :to="{ name: 'signup' }">{{
              $t('btnGroup.signup')
            }}</router-link>
          </a-form-model-item> -->
            </a-form-model>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      publicPath: '',
      ruleForm: {
        identity: '',
        // email: '',
        password: ''
      },
      loading: false,
      rules: {
        identity: [
          {
            required: true,
            message: this.mWords('identity', 'r'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.mWords('pwd', 'r'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.publicPath = this.$util.getPublicPath()
  },
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
          k = 'umail'
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
                    path = 'index.html'
                    location.href = this.publicPath + path
                  } else {
                    location.href = path
                  }
                  sessionStorage.removeItem('path')
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
// 覆盖全局样式
body
  background #246AFE url('~@assets/image/logo_bg.png') no-repeat center
  background-size contain
  position relative
  height auto
</style>

<style lang="stylus" scoped>
.login_img img
  position: relative;
  margin-bottom: -60px;
  width: 100%;
.section
  .sign_box
    padding 90px 110px 20px
    margin 100px auto
    position relative
    color #20123b
    max-width 1260px
    background #fff
    border-radius 10px
    // box-shadow 0 2px 8px 0 rgba(0, 0, 0, .16)
    box-shadow: 0 2px 30px 15px rgba(0,0,0,0.3);
    & >>> .ant-input-lg
      height 55px
    & >>> .ant-form-item
      margin-bottom 15px
    & >>> .ant-btn
      height 55px
</style>
